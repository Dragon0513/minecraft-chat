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
    handleChange({}, { name: 'message', value: '' });
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

  useEffect(() => {
      props.socket.on('message:chat', handleRecvMessage);
      props.socket.on('message:info', handleRecvMessage);
      props.socket.on('message:error', handleRecvMessage);
      props.socket.on('message:success', handleRecvMessage);
    }
  }, [props.socket]);

  useEffect(() => {
    return () => {
        props.socket.off('message:chat', handleRecvMessage);
        props.socket.off('message:info', handleRecvMessage);
        props.socket.off('message:error', handleRecvMessage);
        props.socket.off('message:success', handleRecvMessage);
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
