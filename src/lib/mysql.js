const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "greennext",
});

db.connect((err) => {
  if (err) {
    console.log("Error connectiong to MySQL database: ", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;
