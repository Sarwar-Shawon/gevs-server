var mongoose = require("mongoose");
const mongoAtlasUri = `mongodb://localhost:27017/basic`;
import config from "../configs/db";
function mongooseConnection() {
  try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      config.url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Mongoose is connected")
    );
  } catch (e) {
    console.log("could not connect");
  }
  const dbConnection = mongoose.connection;
  dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
  dbConnection.once("open", () => console.log("Connected to DB!"));
}
module.exports = mongooseConnection;
