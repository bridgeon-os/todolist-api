const express = require("express");
const router = express.Router();
const todos = require("../controllers/todos");
const {tokenVerify} = require("../middleware/tokenVerify");

router.route('/users/todo')
.post(tokenVerify, todos.create)
.get(tokenVerify, todos.readAll)
.put(tokenVerify, todos.update)
.delete(tokenVerify, todos.delete)

// router.route('/users/login')
// .post(users.login)

module.exports = router