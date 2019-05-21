import { useState, useEffect, useRef } from 'react';

import { Header, Progress } from 'semantic-ui-react';
import './PlayerStateTab.scss';

function PlayerStateTab(props) {
  const [Position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const handleRecvMove = (datas) => {
    setPosition(datas);
  }

  const [Health, setHealth] = useState({ food: 0, health: 0, Saturation: 0 });
  const handleRecvHealth = (datas) => {
    setHealth(datas);
  }

  useEffect(() => {
    if (props.socket) {
      props.socket.on('bot:health', handleRecvHealth);
      props.socket.on('bot:move', handleRecvMove);
      props.socket.on('bot:forcedMove', handleRecvMove);
    }
  }, [props.socket]);

  useEffect(() => {
    return () => {
      if (props.socket) {
        props.socket.off('bot:health', handleRecvHealth);
        props.socket.off('bot:move', handleRecvMove);
        props.socket.off('bot:forcedMove', handleRecvMove);
      }
    }
  }, []);

  return (
    <div id="playerstate-container" className="mcc-tab-container" >
      <Header inverted>Position: X:{Position.x}, Y:{Position.y}, Z:{Position.z}</Header>
      <Header inverted>Health: {Health.health}/20</Header>
      <Progress value={Health.health} total='20' attached='bottom' color='red' />
      <Header inverted>Food: {Health.food}/20</Header>
      <Progress value={Health.food} total='20' attached='bottom' color='orange' />
      <Header inverted>Saturation: {Health.Saturation}/5</Header>
      <Progress value={Health.Saturation} total='5' attached='bottom' color='orange' />
    </div >
  );
};

export default PlayerStateTab;
