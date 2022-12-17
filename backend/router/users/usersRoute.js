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
     unfollowUserController,
     blockUserController,
     generateVerificationTokenController
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
userRoutes.put('/unfollow/:id', authMiddleware, unfollowUserController)
userRoutes.put('/block/:id', authMiddleware, blockUserController)
userRoutes.put('/unblock/:id', authMiddleware, unblockUserController)
userRoutes.post('/send-mail', generateVerificationTokenController)


module.exports = userRoutes
