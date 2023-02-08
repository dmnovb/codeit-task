const db = require("../util/database")

module.exports = class Country {
    static fetchAll() {
        return db.execute('SELECT * FROM countries')
    }
}