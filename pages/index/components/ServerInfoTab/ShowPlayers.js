import { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Header, List, Image } from 'semantic-ui-react';

ShowPlayers.propTypes = {
  inverted: PropTypes.bool.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    uuid: PropTypes.string,
    ping: PropTypes.number
  })).isRequired
}

ShowPlayers.defaultProps = {
  inverted: true,
  players: []
}

function ShowPlayers(props) {
  return (
    <Fragment>
      <Header inverted={props.inverted}>Players</Header>
      <List inverted={props.inverted} celled verticalAlign='middle'>
        {props.players.map((player, index) => (
          <List.Item key={index}>
            <Image src={`https://cravatar.eu/helmavatar/${player.uuid}/18.png`} />
            <List.Content>
              <List.Header>{player.username}</List.Header>
            </List.Content>
            <List.Content floated='right'>{player.ping} ms</List.Content>
          </List.Item>
        ))}
      </List>
    </Fragment>
  );
};

export default ShowPlayers;
