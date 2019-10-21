const express = require('express')
const app = express()
const mysql = require('mysql')

const port = 8000

app.get('/environment', (req, res) => res.send(process.env))

app.get('/mysql-test', (req, res, next) => {


    var con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    con.connect(async function(err) {
      if (err) return next(err)
      con.query('SELECT name FROM users', (error, result) => {
        if (error) return next(error)
        res.send(result)
      })
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
