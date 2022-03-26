FROM node:17-slim
WORKDIR /jestersvault
COPY ./package.json ./
RUN npm install --silent
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . .
EXPOSE 3000
CMD ("npm", "start")