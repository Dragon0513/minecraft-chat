import React from 'react';

import { Container, Header } from "semantic-ui-react";
import Tab from './HigherOrderComponents/Tab';

import ChatTab from './components/ChatTab';
import ConnectQuicklyTab from './components/ConnectQuicklyTab';
import ConnectManuallyTab from './components/ConnectManuallyTab';
import SettingTab from './components/SettingTab';

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

      const servers = await Servers.find().lean();;

      return { profiles, servers };
    }

    return {};
  }

  constructor(props) {
    super(props);
  }

  static defaultProps = {
    messages: [],
    profiles: [],
    servers: []
  }

  state = {
    displayMessages: this.props.messages.slice(this.props.messages.length - 200),
    historyMessages: this.props.messages,
    isSubscribe: false,
    isSubscribed: false,
    dark_mode: true
  }

  subscribe = () => {
    if (this.state.isSubscribe && !this.state.isSubscribed) {
      this.props.socket.on('buffer:info', this.handleRecvMessage);
      this.props.socket.on('buffer:error', this.handleRecvMessage);
      this.props.socket.on('buffer:success', this.handleRecvMessage);
      this.props.socket.on('buffer:message', this.handleRecvMessage);
      this.props.socket.on('bot:connect', this.botConnect);
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
    this.props.socket.off('buffer:info', this.handleRecvMessage);
    this.props.socket.off('buffer:error', this.handleRecvMessage);
    this.props.socket.off('buffer:success', this.handleRecvMessage);
    this.props.socket.off('buffer:message', this.handleRecvMessage);
    this.props.socket.off('bot:connect', this.botConnect);
  }

  botConnect = (datas) => {

  }

  // chat
  handleRecvMessage = (message) => {
    this.setState(prevState => {
      const newMessages = prevState.historyMessages.concat(message);
      return {
        historyMessages: newMessages,
        displayMessages: newMessages.slice(newMessages.length - 200)
      };
    });
  }

  handleMessageInputSubmit = (datas) => {
    this.props.socket.emit('chat', { message: datas.message });
  }

  // connect form
  connectMinecraftServer = (datas) => {
    this.props.socket.emit('server:connect', { ...datas });
  }

  // manually connect form
  handleManuallyConnectFormSubmit = (datas) => {
    this.connectMinecraftServer({ ...datas });
  }

  // quicklly connect form
  handleQuicklyConnectFormSubmit = (data) => {
    this.connectMinecraftServer({ ...datas });
  }

  // setting
  handleSettingDarkModeChange = (value) => {
    this.setState({ dark_mode: value });
  }

  render() {
    return (
      <div id="__app" className={this.state.dark_mode ? "inverted" : ""}>
        <Container id="mcc-container">
          <Tab
            socket={this.props.socket}
            defaultActiveIndex={0} inverted={this.state.dark_mode}
            panes={[
              {
                menuItem: { content: 'Chat', icon: 'chat' },
                render: () => (
                  <ChatTab
                    dark_mode={this.state.dark_mode}
                    messages={this.state.displayMessages}
                    handleMessageInputSubmit={this.handleMessageInputSubmit}
                  />
                )
              },
              {
                menuItem: { content: 'Connect to Server' }
              }, {
                menuItem: { content: 'Quickly', icon: 'list' },
                render: () => (
                  <ConnectQuicklyTab
                    dark_mode={this.state.dark_mode}
                    profiles={this.props.profiles}
                  />
                )
              }, {
                menuItem: { content: 'Manually', icon: 'wpforms' },
                render: () => (
                  <ConnectManuallyTab
                    dark_mode={this.state.dark_mode}
                    handleConnectFormSubmit={this.handleManuallyConnectFormSubmit}
                  />
                )
              }, {
                menuItem: { content: 'Other' }
              }, {
                menuItem: { content: 'Setting', icon: 'setting' },
                render: () => (
                  <SettingTab
                    dark_mode={this.state.dark_mode}
                    handleSettingDarkModeChange={this.handleSettingDarkModeChange}
                  />
                )
              }
            ]}
          />
        </Container>
      </div>
    );
  }
}

export default IndexContainer
