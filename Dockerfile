FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 9200

CMD yarn start