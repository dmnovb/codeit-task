const Country = require("../models/countryModel")

exports.getAllCountries = async (req, res, next) => {
    try {
        const [allCountries] = await Country.fetchAll();
        res.status(200).json(allCountries)
    }
    catch (err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
};