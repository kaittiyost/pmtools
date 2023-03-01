#https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY app.js ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]