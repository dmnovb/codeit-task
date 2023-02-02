const express = require('express')
const mysql = require('mysql')
var cors = require('cors')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_current_password',
    database: 'taskDB'
})

db.connect(err => {
    if(err){
        throw err;
    }
    console.log("connected")
})

const app = express()
app.use(cors())
app.use(express.json());

app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE users"
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Database created.')
    })
})



app.get('/users', (req, res) => {
    let sql = "SELECT * FROM users"
    db.query(sql, (err, results ) => {
        if(err) {
            throw err
        }
       
        res.send(results)
    })    
})

app.post('/users', (req, res) => {
    let post = {name: req.body.name,userPassword: req.body.password,  email: req.body.email, country: req.body.country, dateOfBirth: req.body.dateOfBirth, created: Date.now()}
    let query = "INSERT INTO users SET ?"
    db.query(query, post, (err, data) => {
        if(err) {
            throw err
        }
        res.send(post.dateOfBirth)
    })
})

app.get('/countries', (req, res) => {
    let sql = "SELECT * FROM countries"
    db.query(sql, (err, results ) => {
        if(err) {
            throw err
        }
 
        res.send(results)
    })    
})

const port = 3000;

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})