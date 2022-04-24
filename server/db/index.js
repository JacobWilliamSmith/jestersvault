const mongoose = require('mongoose')

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

const DB_URL = "mongodb://" + DB_USER + ":" + DB_PASSWORD + "@" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME + "?authSource=admin"

mongoose.connect(DB_URL, { useNewUrlParser: true })
        .then(() => { console.log('MongoDB database running on port ' + DB_PORT); })
        .catch((err) => {
          console.error(err);
          process.exit();
        })

const db = mongoose.connection

module.exports = db