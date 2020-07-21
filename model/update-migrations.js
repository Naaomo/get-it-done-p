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
    let sql = "alter table serviceProviders add loc_description varchar(100) not null; alter table serviceProviders add loc_lat varchar(50) not null; alter table serviceProviders add loc_lng varchar(50) not null; alter table serviceProviders add loc_locality varchar(200) not null; alter table serviceProviders add description varchar(500) null;";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Altered `serviceProviders` table");
    });

    sql = "INSERT INTO users (displayName, email, password, ut_id, verified, facebook_id, google_id, profile_img) VALUES ('Nanette', 'nanette@gmail.com', '$2b$10$L0/OTh6QHF1bB9E3nXFSdesmjDf7Mk.Oy8NBLxV91UOAThYa0Mw2K', 1, 0, null, null, null),('Naomi', 'naomi@gmail.com', '$2b$10$HDxE8y4nRy3/Xm.n.7dKxOLVzmSwl4w5ZAsNVtCXcjX3DWJ.36rGy', 1, 0, null, null, null),('Mina', 'mina@gmail.com', '$2b$10$sblcl3Ij7Y.EPnl9IPE3He69jZYmih20yJwiZ.PLiJODru3E/aNYm', 1, 0, null, null, null);"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Inserted values into `users` table");
    });

    sql = "INSERT INTO serviceProviders (u_id, st_id, price, loc_description, loc_lat, loc_lng, loc_locality, description) VALUES (3, 3, 10, 'Orgle Rd, Accra, Ghana', '5.577895400000001', '-0.2305186', 'Okaikoi South', 'Will make your roses feel the love'), (3, 1, 30, 'Orgle Rd, Accra, Ghana', '5.577895400000001', '-0.2305186', 'Okaikoi South', 'I can make your floors sparkle'), (4, 3, 5, 'Palace St, Accra, Ghana', '5.581652399999999', '-0.2301826', 'Okaikoi South', 'I''m great at mowing lawns');"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Inserted values into `serviceProviders` table");
    });
    console.log("Closing...");

    con.end();
});
