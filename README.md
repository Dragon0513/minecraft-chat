# MinecraftChat

## Download

```bash
git clone https://github.com/WooLNinesun/MinecraftChat.git
```

## Install and Run :

### Manual

copy `.env.example` to `.env` and set environment variable in the file.

```bash
npm install && npm run build-semantic && npm run build && npm run start
```

Open browser and type url `localhost:${port}` to  use application. `${port}` defined in `.env` file, default is 3000.

`Ctrl+C` to stop the minecraft chat server

### docker-compose (recommand)

`docker-compose.yml` in `dockers-production`, can build and run it in docker-compose

```bash
docker-compose --file dockers/production/docker-compose.yml up -d application
```

Open browser and type url `localhost:${port}` to  use application. `${port}` defined in `docker-compose.yml` file, default is 3000.

To stop the minecraft chat server

```bash
docker-compose --file dockers/production/docker-compose.yml down application
```

## Run test minecraft server

Create simple minecraft server for test. Also can connect to others minecraft server

### Manual

Download official minecraft server jar to create server. [Tutorials](https://minecraft.gamepedia.com/Tutorials/Setting_up_a_server)

### docker-compose (recommand)

`docker-compose.yml` in `dockers-production`, can build and run it in docker-compose

```bash
docker-compose --file dockers/production/docker-compose.yml up -d minecraft-server
```

To stop the minecraft chat server

```bash
docker-compose --file dockers/production/docker-compose.yml down minecraft-server
```
