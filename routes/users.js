const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const tokenVerify = require("../middleware/tokenVerify");

router.route('/users/registration')
.post(users.register)

router.route('/users/login')
.post(users.login)

module.exports = router