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


function stringToHashConversion(string) {
    var hashVal = 0;
    if (string.length == 0) return hashVal;
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hashVal = ((hashVal << 5) - hashVal) + char;
        hashVal = hashVal & hashVal;
    }
    
    return hashVal;
} 


app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE users"
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Database created.')
    })
})
 
app.post('/users', (req, res) => {
    let query = `SELECT singup(?,?,?,?,?,?) as userId`
    let hashedPassword = stringToHashConversion(req.body.password).toString()
    db.query(query, [req.body.name, req.body.email, hashedPassword, req.body.country, req.body.dateOfBirth, Date.now()], (err, row, field) => {
        if(err) {
            throw err
        }
        
        if(row[0].userId == 0) {
            res.status(400).send({Message: "Email is already taken."})
        } else {
            let resp = { id: row[0].userId}
            res.send(resp)
        }
    })
})


app.get('/users/id', (req,res) => {
    let sql = `SELECT id, name,email FROM users where id = ?`
    db.query(sql,req.query.id, (err, row) => {
        if(err) {
            throw err
        }
        
        res.send("ok")
    })
});

app.get('/countries', (req, res) => {
    let sql = "SELECT * FROM countries"
    db.query(sql, (err, row) => {
        if(err) {
            throw err
        }
 
        res.send(row)
    })    
})


app.post('/logout', (req, res) => {
    console.log("calling logout")
    console.log(req.body)
    let sql = `UPDATE login SET isLoggedIn = 0 WHERE userId = ?`
    db.query(sql, [req.body.userId], (err, row, field) => {
        if(err) {
            throw err
        }

        res.send({Message: "Logged out!"})
    })
})
  
app.post('/login', (req, res) => {
    let sql = `SELECT login(?,?) as userId` 
    let hashedPassword = stringToHashConversion(req.body.password).toString()
    db.query(sql, [req.body.emailOrName, hashedPassword], (err, row, field) => {
        if(err) {
            throw err
        }

        if(row[0].userId == 0) {
            let resp = {Message: "Email,Name or password do not match."}
            res.status(401).send(resp)
        } else {
            let userId = row[0].userId
            sql = `SELECT id, name, email FROM users WHERE id = ?`
          
            db.query(sql, userId, (err, row, field) => {
                console.log(row)
                 let resp = {  
                                id: row[0].id,
                                name: row[0].name,
                                email: row[0].email
                            }
                res.send(resp)
            })
        }
    });
})

const port = 3000;

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})