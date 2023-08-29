const { Sequelize } = require('sequelize');
require("dotenv").config()
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: 'backend-db-1',
  dialect: process.env.DIALECT, 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});
module.exports = sequelize;
