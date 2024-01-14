/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoConnection = require("./src/helpers/database-connection");
const appRoutes = require("./src/routes");
app.use(cors());
//app routes
app.use(express.json());
app.use("/gevs", appRoutes);
//
app.use((_, res) => {
  res.send({
    message: "Not found!",
  });
});
//
mongoConnection();
//
app.listen(process.env.PORT, (req, res) => {
  // console.log(`Server is listening on port ${process.env.PORT}`);
});
