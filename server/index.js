require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload')

const sequelize = require("./db");
const models = require("./models/models");
const apiRouter = require("./routers/index");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}))

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

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
