const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../model/user/User')

const authMiddleware =  expressAsyncHandler(async (req, res, next) => {
    let token
    console.log(JSON.stringify(req.headers))

    if (req?.headers?.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers?.authorization.split(' ')[1]
             console.log(token)
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_KEY)
                // var decoded = jwt.decode(token);
                // console.log(decoded);
                // console.log(decoded?.id);
                // console.log("-----")
                const user = await User.findById(decoded?.id).select('-password')
                console.log(user)
                req.user = user
                next();
            }
        }  
        catch (err) {
            throw new Error(`Not authorized token expired: ${err.message}, pls login again`)
        }
    } else {
        throw new Error('Not authorized token') 
    }
})

module.exports = authMiddleware