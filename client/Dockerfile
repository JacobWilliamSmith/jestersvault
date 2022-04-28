FROM node:17-slim
WORKDIR /jestersvault
COPY ./package.json ./
RUN npm install --silent
COPY . .
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
EXPOSE $REACT_DOCKER_PORT
CMD ("npm", "start")