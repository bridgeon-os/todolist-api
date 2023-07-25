const UserModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')

module.exports = {
    create: async (req, res) => {
        try {
            const { apiKey, todo, username } = req.body

            const Collection = await mongoose.connection.db.collection(apiKey)

            const user = await Collection.findOne({ username })

            if (!user) {
                throw new Error('No User Found')
            }

            user.todolist.push({ id: uuidv4(), title: todo })

            await Collection.updateOne({ username }, { $set: { todolist: user.todolist } })

            res.status(200).json({ status: 'success', message: 'Todo Added' })
        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error.message
            })
        }
    },
    readAll: async (req, res) => {
        try {
            const { apiKey, username } = req.body

            const Collection = await mongoose.connection.db.collection(apiKey)

            const user = await Collection.findOne({ username })

            if (!user) {
                throw new Error('No User Found')
            }

            res.status(200).json({
                status: 'success',
                message: 'Successfully fetched todos.',
                data: {
                    todolist: user.todolist
                }
            })

        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error.message
            })
        }
    },
    update: async (req, res) => {
        try {
            const { apiKey, username, todoId, todo } = req.body

            const Collection = await mongoose.connection.db.collection(apiKey)

            const user = await Collection.findOne({ username })

            if (!user) {
                throw new Error('No User Found')
            }

            const updateTodo = user.todolist.find(todo => todo.id === todoId)

            if (!updateTodo) {
                throw new Error('No Todo Found')
            }

            updateTodo.title = todo

            await Collection.updateOne({ username }, { $set: { todolist: user.todolist } })

            res.status(200).json({ status: 'success', message: 'Todo Updated' })

        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error.message
            })
        }
    },
    delete: async (req, res) => {
        try {
            const { apiKey, username, todoId } = req.body

            const Collection = await mongoose.connection.db.collection(apiKey)

            const user = await Collection.findOne({ username })

            if (!user) {
                throw new Error('No User Found')
            }

            const deleteTodo = user.todolist.filter(todo => todo.id !== todoId)

            if(deleteTodo.length === user.todolist.length){
                throw new Error('No Todo Found')
            }

            await Collection.updateOne({ username }, { $set: { todolist: deleteTodo } })

            res.status(200).json({ status: 'success', message: 'Todo Deleted' })

        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error.message
            })
        }
    }
} 