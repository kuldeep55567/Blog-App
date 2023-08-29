const express = require('express');
const app = express();
const sequelize = require('./Config/db');
const {logger} = require("./Middleware/logger")
const {BlogRouter} = require("./Routes/BlogRoute")
const {UserRouter} = require("./Routes/UserRoute")
const cors = require('cors');
require("dotenv").config()
app.use(express.json());
app.use(logger)
app.use(cors());
app.get('/', (req, res) => {
try {
  res.send('Welcome to the Backend of the Blog App!');
} catch (error) {
  res.status(404).json({"error":error})
}
});
app.use(UserRouter)
app.use(BlogRouter)
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database Connected Successfully');
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
startServer()