const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  // your MySQL username (default = root)
  user: "root",
  // your MySQL password
  password: process.env.DB_PW,
  database: "company",
});

module.exports = db;
