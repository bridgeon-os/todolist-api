const express = require("express");
const router = express.Router();
const Admin = require('../controllers/admin')
const {tokenVerify} = require('../middleware/tokenVerify')

router.route('/admin/registration')
.post(Admin.register)

router.route('/test')
.get(Admin.testApi)

module.exports = router