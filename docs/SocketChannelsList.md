# Socket Channels List

## client to server

1. `server:connect` `(data)`: Connect minecraft server.
    ```js
    const dataTypes = Types.shape({
      method: Types.oneOf(['passowrd','session']),
      username: Types.string,
      password: Types.string, // Only use in method === 'password'
      _id: Types.string, // session _id in database and only use in method === 'session' 
      host: Types.string,
      port: Types.string,
      version: Types.string
    });
    ```

2. `server:disconnect` `()`, `disconnect`: Disconnect minecraft server.
3. `bot:chat` `(data)`: Send message to minecraft server.
    ```js
    const dataTypes = Types.shape({
      message: Types.string
    });
    ```

4. `bot:tabComplete` `(input, callback)`: Get tab Complete suggestion from minecraft server.
    ```js
    const inputTypes = Types.string;
    const callbackTypes = Types.function;
    ```

## server to client

1. `message:chat` `(message)`: Recv chat message from minecraft server.
    ```js
    const messageTypes = Types.string;
    ```

2. `message:info` `(message)`: Recv info message from node server.
    ```js
    const messageTypes = Types.string;
    ```

3. `message:success` `(message)`: Recv success message from node server.
    ```js
    const messageTypes = Types.string;
    ```

4. `message:error` `(message)`: Recv error message from minecraft server.
    ```js
    const messageTypes = Types.string;
    ```

5. `bot:connect` `()`: Successfully connect from minecraft server.
6. `bot:disconnect` `()`: Successfully disconnect from minecraft server.
7. `bot:effect` `(effect, isEnd)`: Recv effect info from minecraft server.
    ```js
    const effectTypes = Types.shape({
      id: Types.string // effect id in minecraft.
    });
    const isEndTypes = Types.bool; // effect start or end.
    ```

8. `bot:hud` `(data)`: Recv HUD info from minecraft server.
    ```js
    const dataTypes = Types.shape({
      food: Types.number,
      health: Types.number,
      saturation: Types.number,
      level: Types.number,
      progress: Types.number
    });
    ```

9. `bot:move` `(position)`: Recv position info from minecraft server.
    ```js
    const positionTypes = Types.shape({
      x: Types.number,
      y: Types.number,
      z: Types.number
    });
    ```

10. `bot:players` `player, state`: Recv player joined or left info from minecraft server.
    ```js
    const playerTypes = Types.shape({
      uuid: Types.string,
      username: Types.string,
      ping: Types.number
    });
    const stateTypes = Types.oneOf(['joined', 'left']);
    ```
