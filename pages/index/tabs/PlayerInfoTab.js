import { useState } from 'react';
import useSockets from '../hooks/useSockets';

import ShowPosition from '../components/PlayerInfoTab/ShowPosition'
import ShowHUD from '../components/PlayerInfoTab/ShowHUD'
import ShowEffects from '../components/PlayerInfoTab/ShowEffects'
import './PlayerInfoTab.scss';


function PlayerInfoTab(props) {
  const [Position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const handleRecvMove = (datas) => {
    setPosition(datas);
  }

  const [HUD, setHUD] = useState({
    food: 0,
    health: 0,
    saturation: 0,
    level: 0,
    progress: 0,
    points: 0
  });
  const handleRecvHud = (datas) => {
    setHUD(datas);
  }

  const [Effects, setEffects] = useState(Array.from({ length: 32 }).map(() => false));
  const handleRecvEffect = (recvEffect, isEnd) => {
    const recvEffectId = parseInt(recvEffect.id, 10) - 1;
    setEffects((prevEffects) => prevEffects.map((effect, index) => {
      return (index === recvEffectId) ? !isEnd : effect;
    }));
  }

  const handleDisconnect = () => {
    setPosition({ x: 0, y: 0, z: 0 });
    setHUD({ food: 0, health: 0, saturation: 0, level: 0, progress: 0, points: 0 }); setEffects(Array.from({ length: 32 }).map(() => false));
  }

  useSockets(props.socket, [
    { name: 'bot:hud', handler: handleRecvHud },
    { name: 'bot:move', handler: handleRecvMove },
    { name: 'bot:disconnect', handler: handleDisconnect },
    { name: 'bot:effect', handler: handleRecvEffect }
  ]);

  return (
    <div id="playerinfo-container" className="mcc-tab-container" >
      <ShowPosition inverted={props.inverted} position={Position} />
      <ShowHUD inverted={props.inverted} hud={HUD} />
      <ShowEffects inverted={props.inverted} effects={Effects} />
    </div>
  );
};

export default PlayerInfoTab;
