const express = require('express')
const { userRegisterController, userLoginController } = require('../../controllers/users/usersController')

const userRoutes = express.Router()

userRoutes.post('/register', userRegisterController)
userRoutes.post('/login', userLoginController)

// userRouter.delete("/api/users", (req, res) => {

// })

// userRouter.post("/api/users/login", (req, res) => {
//     res.json({ user: "User Login" });
// });

// userRouter.get("/api/users", (req, res) => {
//     res.json({ user: "fetch all users" });
// });


module.exports = userRoutes
