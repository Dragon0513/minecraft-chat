import React from 'react';

import { Container } from "semantic-ui-react";
import TabHOC from './components/Tab';

import ChatTab from './tabs/ChatTab';
import ConnectRecentTab from './tabs/ConnectRecentTab';
import ConnectLoginTab from './tabs/ConnectLoginTab';
import DisconnectTab from './tabs/DisconnectTab';
import PlayerStateTab from './tabs/PlayerStateTab';
import SettingTab from './tabs/SettingTab';

import './index.scss';

class IndexContainer extends React.Component {
  static async getInitialProps({ req }) {
    if (req && req.model) {
      const { Profiles, Servers } = req.model;
      const __profiles = await Profiles.find().select('username clientToken').lean();
      const profiles = __profiles.map(profile => ({
        ...profile,
        clientToken: profile.clientToken.split('-')[0]
      }));

      const servers = await Servers.find().lean();

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
                menuItem: { content: 'Login', icon: 'sign in' },
                paneTab: (<ConnectLoginTab
                  socket={this.props.socket}
                  dark_mode={this.state.dark_mode}
                />)
              }, {
                type: 'tab',
                menuItem: { content: 'Recent', icon: 'list' },
                paneTab: (<ConnectRecentTab
                  socket={this.props.socket}
                  dark_mode={this.state.dark_mode}
                  profiles={this.props.profiles}
                  servers={this.props.servers}
                />)
              }, {
                type: 'tab',
                menuItem: { content: 'Disconnect', icon: 'sign out' },
                paneTab: (<DisconnectTab
                  dark_mode={this.state.dark_mode}
                  socket={this.props.socket}
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
