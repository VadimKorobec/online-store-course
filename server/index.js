require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./db");
const models = require("./models/models");
const apiRouter = require('./routers/index')

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',apiRouter)

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
