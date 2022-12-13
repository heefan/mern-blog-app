const express = require('express')
const { userRegisterController, userLoginController, fetchUsersController } = require('../../controllers/users/usersController')

const userRoutes = express.Router()

userRoutes.post('/register', userRegisterController)
userRoutes.post('/login', userLoginController)
userRoutes.get('/', fetchUsersController)

module.exports = userRoutes
