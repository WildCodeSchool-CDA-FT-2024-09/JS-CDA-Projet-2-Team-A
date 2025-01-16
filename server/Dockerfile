FROM node:lts-alpine AS dev

WORKDIR /app

COPY *.json ./

RUN npm ping
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]