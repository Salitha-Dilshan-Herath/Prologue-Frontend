
FROM node:12.7-alpine AS build
WORKDIR /SdgpAngularClient
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200
RUN npm run build
CMD npm start