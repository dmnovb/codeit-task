const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.route('/')
.post(userController.loginUser)


module.exports = router;