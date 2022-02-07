require("dotenv").config();
const mysql = require("mysql");

//create Connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected");
});

module.exports = db;
