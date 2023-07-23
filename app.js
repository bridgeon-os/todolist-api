const express = require('express');
const app = express()
const mongoose = require('mongoose')

const {PORT, DB_URL} = process.env

mongoose.connect(DB_URL)
    .then(() => { console.log('DB Connected Successfully') })
    .catch((error) => {console.log('DB Failed to Connect ', error.message)})

app.use(express.json())

const Admin = require('./routes/admin')
app.use('/', Admin)

const User = require('./routes/users')
app.use('/', User)

const Todo = require('./routes/todo')
app.use('/', Todo)

app.listen(PORT, () => {
    console.log('Listening to Port 4000')
})