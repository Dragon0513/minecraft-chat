import { useState } from 'react';

import { Container } from "semantic-ui-react";
import TabHOC from './components/Tab';

import ChatTab from './tabs/ChatTab';
import ConnectTab from './tabs/ConnectTab';
import PlayerStateTab from './tabs/PlayerInfoTab';
import SettingTab from './tabs/SettingTab';

import './index.scss';

IndexContainer.getInitialProps = async ({ req }) => {
  if (req && req.db) {
    const { profiles, servers } = Object.assign({ profiles: [], servers: [] }, req.db);
    return { profiles, servers };
  }

  return {};
}

IndexContainer.defaultProps = {
  socket: null,
  profiles: [],
  servers: []
}

function IndexContainer(props) {
  const [Inverted, setInverted] = useState(true);

  return (
    <div id="__app" className={Inverted ? "inverted" : ""}>
      <Container id="mcc-container">
        <TabHOC
          socket={props.socket}
          defaultActiveIndex={0} inverted={Inverted}
          panes={[
            {
              type: 'tab',
              menuItem: { content: 'Chat', icon: 'chat' },
              paneTab: (<ChatTab
                socket={props.socket}
                inverted={Inverted}
              />)
            }, {
              type: 'header',
              menuItem: { content: 'Information' }
            }, {
              type: 'tab',
              menuItem: { content: 'Player', icon: 'info' },
              paneTab: (<PlayerStateTab
                socket={props.socket}
                inverted={Inverted}
              />)
            },
            {
              type: 'header',
              menuItem: { content: 'Connection' }
            }, {
              type: 'tab',
              menuItem: { content: 'Connect', icon: 'sign in' },
              paneTab: (<ConnectTab
                socket={props.socket}
                inverted={Inverted}
                profiles={props.profiles}
                servers={props.servers}
              />)
            }, {
              type: 'header',
              menuItem: { content: 'Other' }
            }, {
              type: 'tab',
              menuItem: { content: 'Setting', icon: 'setting' },
              paneTab: (<SettingTab
                inverted={Inverted}
                handleSettingDarkModeChange={setInverted}
              />)
            }
          ]}
        />
      </Container>
    </div>
  );
}

export default IndexContainer
