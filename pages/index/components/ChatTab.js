import { useEffect, useRef } from 'react';
import useForm from '../hooks/useForm';

import { Form, Input } from 'semantic-ui-react';
import './ChatTab.scss';

function ChatTab(props) {
  const [values, handleChange, handleSubmit] = useForm({
    message: {}
  }, ({ message }) => {
    handleChange({ target: { name: 'message', value: '' } }, {});
    props.handleMessageInputSubmit({ message });
  });

  const autoScroll = useRef(true);
  const handleMessagesScroll = ({ target }) => {
    const height = target.scrollHeight || 0;
    const offset = target.offsetHeight + target.scrollTop || 0;
    autoScroll.current = (offset + 2 >= height && height >= offset - 2) ? true : false;
  }

  const messagesBoxRef = useRef(null);
  useEffect(() => {
    if (autoScroll.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [props.messages]);

  return (
    <div id="chat-container" >
      <div ref={messagesBoxRef} className="messages-box" onScroll={handleMessagesScroll}>
        {props.messages.map((message, index) => (
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
