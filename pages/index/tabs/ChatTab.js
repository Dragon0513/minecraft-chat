import { useState, useRef } from 'react';
import useForm from '../hooks/useForm';
import useAutoScroll from '../hooks/useAutoScroll';
import useSockets from '../hooks/useSockets';

import { Form, Input } from 'semantic-ui-react';
import './ChatTab.scss';

function ChatTab(props) {
  const [displayMessages, setDisplayMessages] = useState([]);

  const [values, handleChange, handleSubmit] = useForm({
    message: {}
  }, ({ message }) => {
    handleChange({}, { name: 'message', value: '' });
    if (props.socket && props.socket.connected) {
      props.socket.emit('bot:chat', { message });
    }
  });

  const [messagesBoxRef, handleMessagesScroll] = useAutoScroll(displayMessages);

  const historyMessages = useRef([]);
  const handleRecvMessage = (message) => {
    historyMessages.current = historyMessages.current.concat(message);
    const sliceMessages = historyMessages.current;
    setDisplayMessages(sliceMessages.slice(Math.max(sliceMessages.length - 200, 0)));
  }

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      props.socket.emit('bot:tabComplete', values.message, (_, matches) => {
        if (matches.length !== 0) {
          handleRecvMessage(matches.join(' '));
        }
      });
    }
  }

  useSockets(props.socket, [
    { name: 'message:chat', handler: handleRecvMessage },
    { name: 'message:info', handler: handleRecvMessage },
    { name: 'message:error', handler: handleRecvMessage },
    { name: 'message:success', handler: handleRecvMessage }
  ]);

  return (
    <div id="chat-container" className="mcc-tab-container">
      <div ref={messagesBoxRef} className="messages-box" onScroll={handleMessagesScroll}>
        {displayMessages.map((message, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: message }}></div>
        ))}
      </div>
      <Form inverted={props.inverted}
        className='message-input-box'
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Field
            fluid width={16} control={Input} type='text' icon='send'
            name='message' value={values.message}
            onChange={handleChange} onKeyDown={handleKeyDown}
          />
        </Form.Group>
      </Form>
    </div >
  );
};

export default ChatTab;
