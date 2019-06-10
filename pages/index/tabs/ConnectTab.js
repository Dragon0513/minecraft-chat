import useForm from '../hooks/useForm';
import useIsLogin from '../hooks/useIsLogin';
import { supportedVersions } from '../../../server/utils/supportVersion';

import { Header, Divider, Form, Button, Select, Input } from "semantic-ui-react";

import './ConnectTab.scss';

function ConnectTab(props) {
  const IsLogin = useIsLogin(props.socket);

  const [values, handleChange, handleSubmit] = useForm({
    indexOfProfile: { default: -1 },
    indexOfServer: { default: -1 },
    ManuallyUsername: {},
    ManuallyPassword: {},
    ManuallyHost: {},
    ManuallyPort: {},
    ManuallyVersion: {}
  }, (data) => {
    let send_datas = {
      method: 'password',
      username: data.ManuallyUsername,
      password: data.ManuallyPassword,
      host: data.ManuallyHost,
      port: data.ManuallyPort,
      version: data.ManuallyVersion
    }
    if (data.indexOfProfile !== -1) {
      send_datas.method = 'session';
      send_datas = Object.assign(send_datas, {
        _id: props.profiles[data.indexOfProfile]._id,
        username: props.profiles[data.indexOfProfile].username
      });
      delete send_datas.password;
    }
    if (data.indexOfServer !== -1) {
      send_datas = Object.assign(send_datas, {
        host: props.servers[data.indexOfServer].host,
        port: props.servers[data.indexOfServer].port,
        version: props.servers[data.indexOfServer].version
      });
    }
    if (IsLogin == false && props.socket && props.socket.connected) {
      props.socket.emit('server:connect', send_datas);
    }
  });

  const handleDisconnectButtonClick = () => {
    if (props.socket && props.socket.connected) {
      props.socket.emit('server:disconnect');
    }
  }

  return (
    <div id="connect-container" className="mcc-tab-container">
      <Form onSubmit={handleSubmit} inverted={props.inverted}>
        <Header inverted={props.inverted} size='huge'>Profiles</Header>
        <Divider inverted={props.inverted}></Divider>
        <Form.Group>
          <Form.Field
            fluid width={16} control={Select}
            options={props.profiles.map((profile, index) => ({
              text: profile.username,
              value: index,
              description: profile.clientToken
            })).concat({ text: 'Manually fill out the form', value: -1 })}
            name='indexOfProfile' onChange={handleChange}
            defaultValue={-1}
          />
        </Form.Group>
        <Divider hidden />
        <Form.Group>
          <Form.Field
            label='Username or Email'
            required={values.indexOfProfile === -1}
            disabled={values.indexOfProfile !== -1 || IsLogin === true}
            fluid width={8} control={Input} type='text'
            name='ManuallyUsername' value={values.ManuallyUsername}
            onChange={handleChange}
          />
          <Form.Field
            label='Password'
            required={values.indexOfProfile === -1}
            disabled={values.indexOfProfile !== -1 || IsLogin === true}
            fluid width={8} control={Input} type='password'
            name='ManuallyPassword' value={values.ManuallyPassword}
            onChange={handleChange}
          />
        </Form.Group>
        <Header inverted={props.inverted} size='huge'>Host</Header>
        <Divider inverted={props.inverted}></Divider>
        <Form.Group>
          <Form.Field
            fluid width={16} control={Select}
            options={props.servers.map((server, index) => ({
              text: `${server.host}:${server.port}`,
              value: index,
              description: server.version
            })).concat({ text: 'Manually fill out the form', value: -1 })}
            name='indexOfServer' onChange={handleChange}
            defaultValue={-1}
          />
        </Form.Group>
        <Divider hidden />
        <Form.Group>
          <Form.Field
            label='Server Address'
            required={values.indexOfServer === -1}
            disabled={values.indexOfServer !== -1 || IsLogin === true}
            fluid width={8} control={Input} type='text'
            name='ManuallyHost' value={values.ManuallyHost} onChange={handleChange}
          />
          <Form.Field
            label='Port'
            required={values.indexOfServer === -1}
            disabled={values.indexOfServer !== -1 || IsLogin === true}
            fluid width={4} control={Input} type='text'
            name='ManuallyPort' value={values.ManuallyPort} onChange={handleChange}
          />
          <Form.Field
            required={values.indexOfServer === -1}
            disabled={values.indexOfServer !== -1 || IsLogin === true}
            fluid width={4} control={Select}
            options={supportedVersions.map((version) => {
              return { key: version, text: version, value: version };
            })}
            label={{ children: 'Version', htmlFor: 'form-select-control-version' }}
            search
            searchInput={{ id: 'form-select-control-version' }}
            name='ManuallyVersion' onChange={handleChange}
          />
        </Form.Group>
        <Button type='submit' fluid color='grey' disabled={IsLogin}>Connect</Button>
      </Form>
      <Divider inverted={props.inverted} horizontal style={{ margin: '30px 0' }}
      >OR</Divider>
      <Button
        color='red' fluid onClick={handleDisconnectButtonClick}
        inverted={props.inverted} disabled={!IsLogin}
      >Disconnect</Button>
    </div>
  );
}

export default ConnectTab;
