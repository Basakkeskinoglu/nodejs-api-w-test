var mysql = require('mysql');

const con=mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'backtest',
    password:''
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
