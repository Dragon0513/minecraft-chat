import { useState } from 'react';
import useForm from '../hooks/useForm';

import { Header, Divider, Table, Checkbox } from "semantic-ui-react";

import './ConnectRecentTab.scss';

function ConnectRecentTab(props) {
  const [Username, handleUsernameChange, handleUsernameSubmit] = useForm({
    id: {}
  }, (datas) => { });
  const [Hostname, handleHostnameChange, handleHostnameSubmit] = useForm({
    id: {}
  }, (datas) => { });

  return (
    <div id="connect-quickly-container" className="mcc-tab-container">
      <Header inverted={props.dark_mode} size='huge'>Profiles</Header>
      <Divider inverted={props.dark_mode}></Divider>
      <Table size='large' celled striped inverted={props.dark_mode}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Select</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Client Token</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.profiles.map((profile) => (
            <Table.Row key={profile._id}>
              <Table.Cell collapsing textAlign='center'>
                <Checkbox
                  radio fitted
                  name='id' value={profile._id}
                  checked={Username.id === profile._id}
                  onChange={handleUsernameChange}
                /></Table.Cell>
              <Table.Cell>{profile.username}</Table.Cell>
              <Table.Cell>{profile.clientToken}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Divider horizontal inverted={props.dark_mode}>AND</Divider>
      <Header inverted={props.dark_mode} size='huge'>Hostname</Header>
      <Divider inverted={props.dark_mode}></Divider>
      <Table size='large' celled striped inverted={props.dark_mode}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Select</Table.HeaderCell>
            <Table.HeaderCell>Hostname</Table.HeaderCell>
            <Table.HeaderCell>Port</Table.HeaderCell>
            <Table.HeaderCell>Version</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.servers.map((server) => (
            <Table.Row key={server._id}>
              <Table.Cell collapsing textAlign='center'>
                <Checkbox
                  radio fitted
                  name='id' value={server._id}
                  checked={Hostname.id === server._id}
                  onChange={handleHostnameChange}
                /></Table.Cell>
              <Table.Cell>{server.host}</Table.Cell>
              <Table.Cell>{server.port}</Table.Cell>
              <Table.Cell>{server.version}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default ConnectRecentTab;
