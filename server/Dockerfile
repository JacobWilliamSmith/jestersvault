FROM node:17-slim
WORKDIR /jestersvault
COPY ./package.json ./
RUN npm install --silent
COPY . .
EXPOSE 8000
CMD ("npm", "start")