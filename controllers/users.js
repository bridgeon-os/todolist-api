const UserSchema = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

module.exports = {
    register: async (req, res) => {
        try {

            const { username, password, apiKey } = req.body
            
            const Schema = mongoose.model(apiKey, UserSchema)
            
            const Collection = await mongoose.connection.db.collection(apiKey)
       
            const user = await Collection.findOne({ username })
           
            if (user) {
                throw new Error('UserName already Exist!')
            }

            const hashPass = await bcrypt.hash(password, 10)
            const User = new Schema({ username, password: hashPass })
            
            const expiresIn = '15d'
            const token = jwt.sign({username: User.username, apiKey}, process.env.JWT_SECRET, {expiresIn})

            await User.save()

            res.status(200).json({
                status: 'success',
                message: 'Successfully registered!',
                data: { token }
            })

        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error.message
            })
        }
    },

    login: async (req, res) => {
        try {
            console.log(req.body)
            const { username, password, apiKey } = req.body

            const Collection = await mongoose.connection.db.collection(apiKey)

            const user = await Collection.findOne({ username })
            
            if (!user) {
                throw new Error('No UserName Found')
            }
            const comparePass = await bcrypt.compare(
                password,
                user.password
            )

            if (comparePass) {
                const expiresIn = '15d'
                const token = jwt.sign({username: user.username, apiKey}, process.env.JWT_SECRET, {expiresIn})
                return res.status(200).json({
                    status: 'success',
                    message: 'Successfully Logged In.',
                    data: { token }
                })
            }

            res.status(401).json({
                status: 'failure',
                message: 'Check your password or username.'
            })

        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error.message
            })
        }
    }
}