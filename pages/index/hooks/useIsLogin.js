import { useState, useEffect } from 'react';

function useIsLogin(socket, toConnect, toDisconnect) {
  const [IsLogin, setIsLogin] = useState(false);
  const handleConnect = () => {
    if (typeof toConnect === 'function') { toConnect(); }
    setIsLogin(true);
  }
  const handleDisconnect = () => {
    if (typeof toDisconnect === 'function') { toDisconnect(); }
    setIsLogin(false);
  }

  useEffect(() => {
    if (socket && socket.connected) {
      socket.on('bot:connect', handleConnect);
      socket.on('bot:disconnect', handleDisconnect);
    }
  }, [socket]);

  useEffect(() => {
    return () => {
      if (socket && socket.connected) {
        socket.off('bot:connect', handleConnect);
        socket.off('bot:disconnect', handleDisconnect);
      }
    }
  }, []);

  return IsLogin
};

export default useIsLogin;
