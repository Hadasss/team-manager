const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  // your MySQL username (default = root)
  user: "root",
  // your MySQL password
  password: "GadiSha1110!",
  database: "company",
});

module.exports = db;
