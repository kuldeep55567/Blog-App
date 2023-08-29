FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install express mysql2 cors dotenv bcrypt jsonwebtoken sequelize sequelize-mock body-parser nodemon
COPY . .
EXPOSE 4500
CMD [ "npx","nodemon", "index.js" ]
