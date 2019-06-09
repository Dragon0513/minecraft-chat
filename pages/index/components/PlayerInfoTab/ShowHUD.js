import { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Header, Table, Progress } from 'semantic-ui-react';

ShowHUD.prototype = {
  inverted: PropTypes.bool.isRequired,
  hud: PropTypes.shape({
    food: PropTypes.number,
    health: PropTypes.number,
    saturation: PropTypes.number,
    level: PropTypes.number,
    progress: PropTypes.number,
    points: PropTypes.number
  }).isRequired
}

ShowHUD.defaultProps = {
  inverted: true,
  hud: { food: 0, health: 0, saturation: 0, level: 0, progress: 0, points: 0 }
}

function ShowHUD(props) {
  return (
    <Fragment>
      <Header inverted={props.inverted}>HUD</Header>
      <Table definition inverted={props.inverted}>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>Health</Table.Cell>
            <Table.Cell width={1} textAlign='right'>{props.hud.health}/20</Table.Cell>
            <Table.Cell>
              <Progress
                value={props.hud.health} total='20' color='red' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Food</Table.Cell>
            <Table.Cell textAlign='right'>{props.hud.food}/20</Table.Cell>
            <Table.Cell>
              <Progress
                value={props.hud.food} total='20' color='orange' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Saturation</Table.Cell>
            <Table.Cell textAlign='right'>{props.hud.saturation}/5</Table.Cell>
            <Table.Cell>
              <Progress
                value={props.hud.saturation} total='5' color='orange' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Level</Table.Cell>
            <Table.Cell textAlign='right'>{props.hud.level}</Table.Cell>
            <Table.Cell>
              <Progress
                value={props.hud.progress} total='1' color='green' progress='percent' />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default ShowHUD;
