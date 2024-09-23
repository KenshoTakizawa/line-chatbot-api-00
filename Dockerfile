FROM node:20

COPY . /app

WORKDIR /app
RUN npm ci

CMD ["npm", "run", "migration:run"]