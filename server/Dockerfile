FROM node:lts-alpine AS dev

WORKDIR /app

COPY *.json ./

RUN npm install

COPY src src
COPY data data
COPY .env .env

EXPOSE 8000

CMD ["npm", "run", "seed"]