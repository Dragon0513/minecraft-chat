import { useState } from 'react';
import useSockets from '../hooks/useSockets';
import useIsLogin from '../hooks/useIsLogin';

import ShowPlayers from '../components/ServerInfoTab/ShowPlayers';
import './ServerInfoTab.scss';


function ServerInfoTab(props) {
  const [Players, setPlayers] = useState([]);

  const handleRecvPlayer = (recvPlayer, state) => {
    setPlayers((prevPlayers) => {
      let tmpPlayers = prevPlayers.filter((player) => (player.uuid !== recvPlayer.uuid));

      if (state === 'joined') {
        tmpPlayers.push(recvPlayer);
      }

      return tmpPlayers;
    });
  }

  useIsLogin(props.socket, {}, () => { setPlayers([]); });

  useSockets(props.socket, [
    { name: 'bot:players', handler: handleRecvPlayer }
  ]);

  return (
    <div id="serverinfo-container" className="mcc-tab-container" >
      <ShowPlayers inverted={props.inverted} players={Players} />
    </div>
  );
};

export default ServerInfoTab;
