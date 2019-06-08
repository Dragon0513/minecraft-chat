import React from 'react';

import { Container } from "semantic-ui-react";
import TabHOC from './components/Tab';

import ChatTab from './tabs/ChatTab';
import ConnectTab from './tabs/ConnectTab';
import PlayerStateTab from './tabs/PlayerStateTab';
import SettingTab from './tabs/SettingTab';

import './index.scss';

class IndexContainer extends React.Component {
  static async getInitialProps({ req }) {
    if (req && req.db) {
      const { profiles, servers } = Object.assign({ profiles: [], servers: [] }, req.db);
      return { profiles, servers };
    }

    return {};
  }

  static defaultProps = {
    profiles: [],
    servers: []
  }

  state = {
    isSubscribe: false,
    isSubscribed: false,
    dark_mode: true
  }

  subscribe = () => {
    if (this.state.isSubscribe && !this.state.isSubscribed) {
      this.setState({ isSubscribed: true });
    }
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.socket && !state.isSubscribe) {
      return { isSubscribe: true };
    }
    return null;
  }

  componentWillUnmount() {
  }

  // setting
  handleSettingDarkModeChange = (value) => {
    this.setState({ dark_mode: value });
  }

  render() {
    return (
      <div id="__app" className={this.state.dark_mode ? "inverted" : ""}>
        <Container id="mcc-container">
          <TabHOC
            socket={this.props.socket}
            defaultActiveIndex={0} inverted={this.state.dark_mode}
            panes={[
              {
                type: 'tab',
                menuItem: { content: 'Chat', icon: 'chat' },
                paneTab: (<ChatTab
                  socket={this.props.socket}
                  dark_mode={this.state.dark_mode}
                />)
              }, {
                type: 'tab',
                menuItem: { content: 'State', icon: 'info' },
                paneTab: (<PlayerStateTab
                  socket={this.props.socket}
                  dark_mode={this.state.dark_mode}
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
                  dark_mode={this.state.dark_mode}
                  handleSettingDarkModeChange={this.handleSettingDarkModeChange}
                />)
              }
            ]}
          />
        </Container>
      </div>
    );
  }
}

export default IndexContainer
