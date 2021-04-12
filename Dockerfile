FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY routers ./routers
COPY middleware ./middleware
COPY db ./db
COPY index.js .

EXPOSE 3001

CMD [ "npm", "run", "dev" ]