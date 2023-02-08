const express = require("express");

const countryController = require("../controllers/country");

const router = express.Router();

router.get('/', countryController.getAllCountries);



module.exports = router;