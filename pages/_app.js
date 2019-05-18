import App, { Container } from 'next/app';
import Head from 'next/head';
import io from 'socket.io-client';

import '../static/minecraft-font/minecraft-font.scss';
import '../static/semantic/semantic.min.css';
import './_app.scss';

class MinecraftChatApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  state = {
    socket: null
  }

  componentDidMount() {
    // connect to WS server and listen event
    const socket = io();
    this.setState({ socket });
  }

  // close socket connection
  componentWillUnmount() {
    this.state.socket.close();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <title>MinecraftChat | WooLNinesun</title>
          <meta name="author" content="WooLNinesun" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <meta name="description" content="Real time minecraft chat client developed by WooLNinesun." />
          <link rel="shortcut icon" href="/static/favicon.png" />
        </Head>
        <Component {...pageProps} socket={this.state.socket} />
      </Container>
    );
  }
}

export default MinecraftChatApp
