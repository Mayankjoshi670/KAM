const mysql = require('mysql2') ; 
const dotenv = require('dotenv') ;
dotenv.config() ;
const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST ||"localhost",
    user: process.env.MYSQL_USER ||"Mayank",
    password: process.env.MYSQL_PASSWORD ||"Mayank@123",
    database: process.env.MYSQL_DB   });
  conn.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL");
  });


  module.exports = conn ; 