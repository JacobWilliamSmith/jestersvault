const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

const db = mongoose.connection;

module.exports = db;
