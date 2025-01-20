FROM node:lts-alpine AS dev

WORKDIR /app

COPY *.json ./

RUN npm install

COPY src src
COPY index.ts ./index.ts

EXPOSE 2001

CMD ["npm", "run", "dev"]