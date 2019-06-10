import { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Header, Table } from 'semantic-ui-react';

ShowPosition.propTypes = {
  inverted: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  }).isRequired
}

ShowPosition.defaultProps = {
  inverted: true,
  position: { x: 0, y: 0, z: 0 }
}

function ShowPosition(props) {
  return (
    <Fragment>
      <Header inverted={props.inverted}>Position</Header>
      <Table definition inverted={props.inverted}>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>X</Table.Cell>
            <Table.Cell>{props.position.x}</Table.Cell>
            <Table.Cell>({Math.floor(props.position.x / 16)})</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Y</Table.Cell>
            <Table.Cell>{props.position.y}</Table.Cell>
            <Table.Cell>({Math.floor(props.position.y / 16)})</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Z</Table.Cell>
            <Table.Cell>{props.position.z}</Table.Cell>
            <Table.Cell>({Math.floor(props.position.z / 16)})</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default ShowPosition;
