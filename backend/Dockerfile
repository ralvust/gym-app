FROM node:13.13.0-alpine3.11

WORKDIR /app
COPY package.json .

RUN npm install

COPY src ./src
CMD ["npm", "run", "start-prod"]