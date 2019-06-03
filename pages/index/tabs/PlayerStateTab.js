import { useState, useEffect } from 'react';

import { Header, Progress, Table } from 'semantic-ui-react';
import './PlayerStateTab.scss';

function PlayerStateTab(props) {
  const [Position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const handleRecvMove = (datas) => {
    setPosition(datas);
  }

  const [Hud, setHud] = useState({
    food: 0,
    health: 0,
    saturation: 0,
    level: 0,
    progress: 0,
    points: 0
  });
  const handleRecvHud = (datas) => {
    setHud(datas);
  }

  useEffect(() => {
    if (props.socket) {
      props.socket.on('bot:hud', handleRecvHud);
      props.socket.on('bot:move', handleRecvMove);
      props.socket.on('bot:forcedMove', handleRecvMove);
    }
  }, [props.socket]);

  useEffect(() => {
    return () => {
      if (props.socket) {
        props.socket.off('bot:hud', handleRecvHud);
        props.socket.off('bot:move', handleRecvMove);
        props.socket.off('bot:forcedMove', handleRecvMove);
      }
    }
  }, []);

  return (
    <div id="playerstate-container" className="mcc-tab-container" >
      <Header inverted={props.dark_mode}>Position</Header>
      <Table definition inverted={props.dark_mode}>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>X</Table.Cell>
            <Table.Cell>{Position.x}</Table.Cell>
            <Table.Cell>({Math.floor(Position.x / 16)})</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Y</Table.Cell>
            <Table.Cell>{Position.y}</Table.Cell>
            <Table.Cell>({Math.floor(Position.y / 16)})</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Z</Table.Cell>
            <Table.Cell>{Position.z}</Table.Cell>
            <Table.Cell>({Math.floor(Position.z / 16)})</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Header inverted={props.dark_mode}>HUD</Header>
      <Table definition inverted={props.dark_mode}>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>Health</Table.Cell>
            <Table.Cell width={1} textAlign='right'>{Hud.health}/20</Table.Cell>
            <Table.Cell>
              <Progress
                value={Hud.health} total='20' color='red' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Food</Table.Cell>
            <Table.Cell textAlign='right'>{Hud.food}/20</Table.Cell>
            <Table.Cell>
              <Progress
                value={Hud.food} total='20' color='orange' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Saturation</Table.Cell>
            <Table.Cell textAlign='right'>{Hud.saturation}/5</Table.Cell>
            <Table.Cell>
              <Progress
                value={Hud.saturation} total='5' color='orange' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Level</Table.Cell>
            <Table.Cell textAlign='right'>{Hud.level}</Table.Cell>
            <Table.Cell>
              <Progress
                value={Hud.progress} total='1' color='green' progress='percent' />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div >
  );
};

export default PlayerStateTab;
