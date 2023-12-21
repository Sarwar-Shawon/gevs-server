const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
//
const mongooseConnection = require("./src/helpers/mongoose-connection");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
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
