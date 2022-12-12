const User = require('../../model/user/User');

const userRegisterController = async (req, res) => {
    const isUserExist = await User.findOne({email: req?.body?.email})
    // if (isUserExist)  
    
    try {
        const user = await User.create({
            firstName: req?.body?.lastName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            password: req?.body?.password
        });
        console.log(req.body);
        res.json('user');
    } catch (error) {
        res.json(error);
    }
};

module.exports = { userRegisterController };