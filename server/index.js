const express = require('express')
const cors = require('cors')
const app = express()
const users = require('./routes/users')
const countries = require('./routes/countries')
const logout = require('./routes/logout')
const login = require('./routes/login')

app.use(cors())
app.use(express.json());

app.use('/users', users)

app.use('/countries', countries)

app.use('/users', users)
 
app.use('/logout', logout)
  
app.use('/login', login)

const port = 3000;

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})
