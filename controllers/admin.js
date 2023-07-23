const UserSchema = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const { ADMIN_REGISTER_PASSWORD } = process.env
module.exports = {
    register: async (req, res) => {
        try {
            const { adminName, password } = req.body

            if(!adminName){
                throw new Error('Admin Name is not defined.')
            }
            
            // Creating a API Key for Admin
            const apiKey = adminName + '-dbs'

            // Code to check collection already exist or not
            const collections = await mongoose.connection.db.listCollections().toArray()
            const isCollectionExist = collections.find(collection => collection.name === apiKey)
            if(isCollectionExist){
                throw new Error('Collection for Admin name already exist.')
            }

            if (password === ADMIN_REGISTER_PASSWORD) {
                const UserModel = mongoose.model(apiKey, UserSchema)
            }

            const payload = {adminName}
            const token = jwt.sign(payload, process.env.JWT_SECRET)

            res.status(200).json({
                status: 'success',
                message: 'Successfully Created a DB for Admin: ' + adminName,
                data: {
                    token,
                    apiKey
                }
            })

        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error.message
            })
        }
    },

    testApi: async (req, res) => {
        try {
            const collections = await mongoose.connection.db.listCollections().toArray()
            res.status(200).json({
                status: 'success',
                message: 'Test success!',
                totalCollections: collections.length,
                collectionDetails: collections
            })
        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error.message
            })
        }

    }
}