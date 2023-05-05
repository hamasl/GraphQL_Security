# Inspired by nodejs guide:
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp (05.05.23)

FROM node:lts-hydrogen

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]