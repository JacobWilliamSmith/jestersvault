FROM node:17-slim
WORKDIR /jestersvault
COPY ./package.json ./
RUN npm install --silent
COPY . .
EXPOSE $NODE_DOCKER_PORT
CMD ("npm", "start")