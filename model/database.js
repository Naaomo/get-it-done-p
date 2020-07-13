require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "get_it_done",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = "DROP TABLE if EXISTS userType; CREATE TABLE userType(ut_id INT NOT NULL AUTO_INCREMENT, type VARCHAR(40) NOT NULL, PRIMARY KEY (ut_id));";
  con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table creation `userType` was successful!");
  });

  sql = "DROP TABLE if EXISTS serviceType; CREATE TABLE serviceType(st_id   INT AUTO_INCREMENT PRIMARY KEY, service VARCHAR(255) NOT NULL);";
  con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table creation `serviceType` was successful!");
  });

  sql = "DROP TABLE IF EXISTS users; CREATE TABLE users(u_id INT AUTO_INCREMENT PRIMARY KEY, fname VARCHAR(50) NOT NULL, lname VARCHAR(50) NOT NULL, email VARCHAR(200) NOT NULL, password VARCHAR(500) NOT NULL, ut_id INT NOT NULL, verified TINYINT DEFAULT 0 NOT NULL, FOREIGN KEY (ut_id) REFERENCES userType(ut_id));";
  con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table creation `users` was successful!");
  });

  sql = "DROP TABLE IF EXISTS serviceProviders; CREATE TABLE serviceProviders(sp_id INT AUTO_INCREMENT PRIMARY KEY, u_id INT NOT NULL, st_id INT NOT NULL, price INT NOT NULL, FOREIGN KEY (u_id) REFERENCES users(u_id), FOREIGN KEY (st_id) REFERENCES serviceType(st_id));";
  con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table creation `serviceProviders` was successful!");
  });

  sql = "DROP TABLE IF EXISTS orders; CREATE TABLE orders(o_id INT AUTO_INCREMENT PRIMARY KEY, u_id INT NOT NULL, sp_id INT NOT NULL, order_date DATETIME default CURRENT_TIMESTAMP NOT NULL, FOREIGN KEY(u_id) REFERENCES users(u_id), FOREIGN KEY (sp_id) REFERENCES serviceProviders(sp_id));";
  con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table creation `orders` was successful!");
  });


    console.log("Closing...");

  con.end();
});


