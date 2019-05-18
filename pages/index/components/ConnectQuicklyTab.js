import { Header, Divider, Table, Button } from "semantic-ui-react";
import './ConnectQuicklyTab.scss';

function ConnectQuicklyTab(props) {
  return (
    <div id="connect-quickly-container" >
      <Header inverted={props.dark_mode} size='huge'>Profiles</Header>
      <Divider inverted={props.dark_mode}></Divider>
      <Table size='large' celled striped inverted={props.dark_mode}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Client Token</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.profiles.map((profile) => (
            <Table.Row key={profile._id}>
              <Table.Cell>{profile.username}</Table.Cell>
              <Table.Cell>{profile.clientToken}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default ConnectQuicklyTab;
