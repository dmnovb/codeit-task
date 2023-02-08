const User = require("../models/userModel")
const db = require('../util/database')

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

exports.getAllUsers = async (req, res, next) => {
    try {
        db.execute('SELECT * FROM users', (err, result) => {
           if(err) {
                throw err;
           }

            res.send(result)
        })
    }
    catch (err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
};

exports.createUser = async (req, res, next) => {
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
}

exports.logoutUser = async (req, res) => {
    let sql = `UPDATE login SET isLoggedIn = 0 WHERE userId = ?`
    db.query(sql, [req.body.userId], (err) => {
        if(err) {
            throw err
        }

        res.send({Message: "Logged out!"})
    })
}

exports.loginUser = async (req, res) => {
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
                 let resp = {  
                                id: row[0].id,
                                name: row[0].name,
                                email: row[0].email
                            }
                res.send(resp)
            })
        }
    });
}