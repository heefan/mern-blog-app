const express = require('express')
const { userRegisterController,
     userLoginController, 
     fetchUsersController,
     deleteUserController,
    } = require('../../controllers/users/usersController')

const userRoutes = express.Router()

userRoutes.post('/register', userRegisterController)
userRoutes.post('/login', userLoginController)
userRoutes.get('/', fetchUsersController)
userRoutes.delete('/:id', deleteUserController)

module.exports = userRoutes
