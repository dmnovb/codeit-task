const db = require("../util/database")

module.exports = class User {
    constructor(id, name, email, userPassword, country, dateOfBirth) {
        this.id = id
        this.name = name
        this.email = email
        this.userPassword = userPassword
        this.country = country
        this.dateOfBirth = dateOfBirth
    }

    static fetchAll() {
        return db.execute('SELECT * FROM users')
    }
}