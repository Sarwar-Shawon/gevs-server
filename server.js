const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
//
const mongooseConnection = require("./src/helpers/mongoose-connection");
app.use(cors());

app.use((_, res) => {
  res.send({
    message: "Not found!",
  });
});
//
mongooseConnection();
//
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
