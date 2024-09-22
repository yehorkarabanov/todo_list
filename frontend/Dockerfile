FROM node:22-alpine3.19

WORKDIR /app

ENV PATH `/app/node_modules/.bin` to $PATH

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . .