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
    console.log("Running Database Updates...");

    // Alter tables
    let sql = "alter table serviceProviders add loc_description varchar(100) not null; alter table serviceProviders add loc_lat varchar(50) not null; alter table serviceProviders add loc_lng varchar(50) not null; alter table serviceProviders add loc_locality varchar(200) not null;";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Altered `serviceProviders` table");
    });


    console.log("Closing...");

    con.end();
});
