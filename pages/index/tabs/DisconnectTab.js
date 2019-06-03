import useIsLogin from '../hooks/useIsLogin';

import { Button } from "semantic-ui-react";
import './DisconnectTab.scss';

function DisconnectTab(props) {
  const IsLogin = useIsLogin(props.socket);

  const handleDisconnectButtonClick = () => {
    props.socket.emit('bot:disconnect');
  }

  return (
    <div id="disconnect-container" className="mcc-tab-container">
      <Button
        color='red' inverted={props.dark_mode} disabled={!IsLogin}
        onClick={handleDisconnectButtonClick}
      >Disconnect</Button>
    </div>
  );
};

export default DisconnectTab;
