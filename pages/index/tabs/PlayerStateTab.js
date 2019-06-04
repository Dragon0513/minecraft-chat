import { useState, useEffect } from 'react';

import { Header, Progress, Table, Image } from 'semantic-ui-react';
import './PlayerStateTab.scss';

import { effectData } from '../datas/effects.json';

function PlayerStateTab(props) {
  const [Position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const handleRecvMove = (datas) => {
    setPosition(datas);
  }

  const [Effects, setEffects] = useState(Array.apply(null, Array(32)).map(() => false));
  const handleRecvEffect = (effect) => {
    let newEffects = Effects;
    newEffects[parseInt(effect.id, 10) - 1] = !effect.isEnd;
    setEffects([...newEffects]);
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

  const handleDisconnect = () => {
    setHud({ food: 0, health: 0, saturation: 0, level: 0, progress: 0, points: 0 });
  }

  useEffect(() => {
    if (props.socket) {
      props.socket.on('bot:hud', handleRecvHud);
      props.socket.on('bot:move', handleRecvMove);
      props.socket.on('bot:disconnect', handleDisconnect);
      props.socket.on('bot:effect', handleRecvEffect);
    }
  }, [props.socket]);

  useEffect(() => {
    return () => {
      if (props.socket) {
        props.socket.off('bot:hud', handleRecvHud);
        props.socket.off('bot:move', handleRecvMove);
        props.socket.off('bot:disconnect', handleDisconnect);
        props.socket.off('bot:effect', handleRecvEffect);
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
      <Header inverted={props.dark_mode}>Effect</Header>
      <Image.Group size='tiny'>
        {Effects.map((effect, index) => {
          if (effect) {
            return (<Image key={index}
              src={`/static/mc-effect/${index + 1}.png`}
              title={effectData[index].displayName}
            />)
          }
        })}
      </Image.Group>
    </div>
  );
};

export default PlayerStateTab;
