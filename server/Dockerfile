FROM node:lts-alpine AS dev

WORKDIR /app

COPY *.json ./

RUN npm ping
RUN npm install

COPY . .
COPY redis.config.ts ./redis.config.ts

EXPOSE 8000

CMD ["npm", "run", "dev"]