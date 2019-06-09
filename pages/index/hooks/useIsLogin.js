import { useState } from 'react';
import useSockets from './useSockets';

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

  useSockets(socket, [
    { name: 'bot:connect', handler: handleConnect },
    { name: 'bot:disconnect', handler: handleDisconnect }
  ]);

  return IsLogin
};

export default useIsLogin;
