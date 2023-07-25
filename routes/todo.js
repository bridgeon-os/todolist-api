const express = require("express");
const router = express.Router();
const todos = require("../controllers/todos");
const {tokenVerify} = require("../middleware/tokenVerify");

router.route('/users/todo')
.post(todos.create)
.get(todos.readAll)
.put(todos.update)
.delete(todos.delete)

// router.route('/users/login')
// .post(users.login)

module.exports = router