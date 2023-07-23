const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    todolist: [
        {
            id: {
              type: String,
              required: true,              
            },
            title: {
                type: String,
                required: true
            },
        }
    ]
})

// const UserModel = mongoose.model('Users', UserSchema)

module.exports = UserSchema
