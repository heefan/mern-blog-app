const express = require('express')
const authMiddleware = require('../../middleware/auth/authMiddleware')

const { userRegisterController,
     userLoginController, 
     fetchUsersController,
     deleteUserController,
     fetchUserDetailsController,
     userProfileController
    } = require('../../controllers/users/usersController')

const userRoutes = express.Router()

userRoutes.post('/register', userRegisterController)
userRoutes.post('/login', userLoginController)
userRoutes.get('/', authMiddleware, fetchUsersController)
userRoutes.delete('/:id', deleteUserController)
userRoutes.get('/:id', fetchUserDetailsController)
userRoutes.get('/profile/:id', userProfileController)

module.exports = userRoutes
