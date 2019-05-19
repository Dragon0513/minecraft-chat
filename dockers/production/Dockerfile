FROM node:10.15.3
LABEL maintainer="WooLNinesun"

# Create app directory
WORKDIR /usr/src/app

# npm install
COPY package*.json ./
RUN npm ci --only=production

# copy source and build
COPY . .
RUN npm run build
RUN cp .env.example .env

# start server
CMD [ "npm", "start" ]

EXPOSE 3000
