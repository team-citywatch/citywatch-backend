FROM node:10.15.0

RUN npm install -g yarn npm

COPY ./dist /app/dist
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
WORKDIR /app

RUN yarn --production

CMD ["yarn", "start-prod"]
