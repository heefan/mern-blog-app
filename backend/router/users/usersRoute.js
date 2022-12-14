const express = require('express')
const authMiddleware = require('../../middleware/auth/authMiddleware')

const { userRegisterController,
     userLoginController, 
     fetchUsersController,
     deleteUserController,
     fetchUserDetailsController,
     userProfileController,
     updateUserController,
     updateUserPasswordController,
     followingUserController,
    } = require('../../controllers/users/usersController')

const userRoutes = express.Router()

userRoutes.post('/register', userRegisterController)
userRoutes.post('/login', userLoginController)
userRoutes.delete('/:id', deleteUserController)
userRoutes.get('/', authMiddleware, fetchUsersController)
userRoutes.get('/:id', fetchUserDetailsController)
userRoutes.get('/profile/:id', authMiddleware, userProfileController)
userRoutes.put('/:id', authMiddleware, updateUserController)
userRoutes.put('/password/:id', authMiddleware, updateUserPasswordController)
userRoutes.put('/follow/:id', authMiddleware, followingUserController)

module.exports = userRoutes
