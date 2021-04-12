FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY public ./public

EXPOSE 3000

ENV REACT_APP_MOVIE_KEY=<API_KEY_FROM_MOVIE_DB>

CMD ["npm", "start"]