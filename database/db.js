var mysql = require('mysql2');

var db = mysql.createConnection({
  host: `127.0.0.1`,
  user: "root",
  password: "1234",
  port:"3306"
});



db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    let createDb = `CREATE DATABASE IF NOT EXISTS company`

    let query = `CREATE TABLE IF NOT EXISTS company.orders( 
        order_id int NOT NULL,
        product_id varchar(255) NOT NULL,
        customer_id varchar(255) NOT NULL,
        product_name varchar(255),
        catagory varchar(255),
        region varchar(255),
        date_of_sale date,
        quantity_sold int,
        unit_price int,
        discount int,
        shipping_cost int,
        payment_method varchar(255),
        customer_name varchar(255),
        customer_email varchar(255),
        customer_address varchar(255),
        CONSTRAINT UC_Orders UNIQUE (order_id,product_id,customer_id)
    )`;

    db.query(`${createDb}`,(err,res)=>{
        if (err) throw err;
        console.log("db Created");
    })

    db.query(`${query}`,(err,res)=>{
        if (err) throw err;
        console.log("Table Created");
    })
});

module.exports = db