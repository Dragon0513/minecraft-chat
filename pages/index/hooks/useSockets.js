import { useEffect } from 'react';

function useSockets(socket, channels) {
  useEffect(() => {
    console.log('HH', socket && socket.connected);
    if (socket && socket.connected) {
      channels.forEach(channel => {
        socket.on(channel.name, channel.handler);
      });
    }
  }, [socket]);

  useEffect(() => {
    return () => {
      console.log('QQ', socket && socket.connected);
      if (socket && socket.connected) {
        channels.forEach(channel => {
          socket.off(channel.name, channel.handler);
        });
      }
    }
  }, []);
};

export default useSockets;
