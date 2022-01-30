const mysql = require("mysql");
// const db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: "/tmp/mysql.sock",
  password: "password",
  database: "standard_auth",
});

module.exports = db;
