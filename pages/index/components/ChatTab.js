import { useState, useEffect, useRef } from 'react';
import useForm from '../hooks/useForm';
import useAutoScroll from '../hooks/useAutoScroll';

import { Form, Input } from 'semantic-ui-react';
import './ChatTab.scss';

function ChatTab(props) {
  const [displayMessages, setDisplayMessages] = useState([]);

  const [values, handleChange, handleSubmit] = useForm({
    message: {}
  }, ({ message }) => {
    handleChange({ target: { name: 'message', value: '' } }, {});
    if (props.socket) {
      props.socket.emit('chat', { message });
    }
  });

  const [messagesBoxRef, handleMessagesScroll] = useAutoScroll(displayMessages);

  const historyMessages = useRef([]);
  const handleRecvMessage = (message) => {
    historyMessages.current = historyMessages.current.concat(message);
    const sliceMessages = historyMessages.current;
    setDisplayMessages(sliceMessages.slice(Math.max(sliceMessages.length - 200, 0)));
  }

  useEffect(() => {
    if (props.socket) {
      props.socket.on('buffer:info', handleRecvMessage);
      props.socket.on('buffer:error', handleRecvMessage);
      props.socket.on('buffer:success', handleRecvMessage);
      props.socket.on('buffer:message', handleRecvMessage);
    }
  }, [props.socket]);

  useEffect(() => {
    return () => {
      if (props.socket) {
        props.socket.off('buffer:info', handleRecvMessage);
        props.socket.off('buffer:error', handleRecvMessage);
        props.socket.off('buffer:success', handleRecvMessage);
        props.socket.off('buffer:message', handleRecvMessage);
      }
    }
  }, []);

  return (
    <div id="chat-container" className="mcc-tab-container">
      <div ref={messagesBoxRef} className="messages-box" onScroll={handleMessagesScroll}>
        {displayMessages.map((message, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: message }}></div>
        ))}
      </div>
      <Form inverted={props.dark_mode}
        className='message-input-box'
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Field
            fluid width={16} control={Input} type='text' icon='send'
            name='message' value={values.message}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </div >
  );
};

export default ChatTab;
