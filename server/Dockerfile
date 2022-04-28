FROM alpine:latest
RUN apk add --update nodejs && apk add --update npm
WORKDIR /jestersvault
COPY ./package.json ./
RUN npm install --silent
COPY . .
EXPOSE $NODE_DOCKER_PORT
CMD ("npm", "start")