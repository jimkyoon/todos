const mongoose = require('mongoose');
// database connection
// dotenv for database info
require('dotenv').config();
// mongoose connection
const db = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true },
  (err) => {
    if (err) console.log(err);
    else console.log('Connected to the database!');
  },
);

module.exports = db;
