import useForm from '../hooks/useForm';
import { supportedVersions } from '../../../server/utils/supportVersion';

import { Form, Select, Input, Button } from "semantic-ui-react";
import './ConnectLoginTab.scss';

function ConnectLoginTab(props) {
  const [values, handleChange, handleSubmit] = useForm({
    username: {},
    password: {},
    version: {},
    host: {},
    port: {}
  }, (data) => {
    if (props.socket) {
      props.socket.emit('server:connect', { method: 'password', ...data });
    }
  });

  return (
    <div id="connect-manually-container" className="mcc-tab-container">
      <Form onSubmit={handleSubmit} inverted={props.dark_mode}>
        <Form.Group>
          <Form.Field
            label='Username or Email'
            required fluid width={8} control={Input} type='text'
            name='username' value={values.username} onChange={handleChange}
          />
          <Form.Field
            label='Password'
            required fluid width={8} control={Input} type='password'
            name='password' value={values.password} onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            required fluid width={4} control={Select}
            options={supportedVersions.map((version) => {
              return { key: version, text: version, value: version };
            })}
            label={{ children: 'Version', htmlFor: 'form-select-control-version' }}
            search
            searchInput={{ id: 'form-select-control-version' }}
            name='version' onChange={handleChange}
          />
          <Form.Field
            label='Server Address'
            required fluid width={8} control={Input} type='text'
            name='host' value={values.host} onChange={handleChange}
          />
          <Form.Field
            label='Port'
            required fluid width={4} control={Input} type='text'
            name='port' value={values.port} onChange={handleChange}
          />
        </Form.Group>
        <Button type='submit' fluid color='grey'>Connect</Button>
      </Form>
    </div>
  );
};

export default ConnectLoginTab;
