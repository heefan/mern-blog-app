const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken")

const userRegisterController = expressAsyncHandler(async (req, res) => {
  const isUserExist = await User.findOne({ email: req?.body?.email });
  if (isUserExist) throw new Error("User already exists");

  try {
    const user = await User.create({
      firstName: req?.body?.lastName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    console.log(req.body);
    res.json("user");
  } catch (error) {
    res.json(error);
  }
});

const userLoginController = expressAsyncHandler(async (req, res) => { 
  const {email, password} = req.body;

  const theUser = await User.findOne({ email })
  if (!theUser) throw new Error(`User email not exists`);

  if (await (theUser?.isPasswordMatched(password))) {
    res.json ({ 
      firstName: theUser?.firstName,
      lastName: theUser?.lastName,
      email: theUser?.email,
      profilePhoto: theUser?.profilePhoto,
      isAdmin: theUser?.isAdmin,
      token: generateToken(theUser?._id)
    })
  } else {
    res.status(401);
    throw new Error('Invalid login credentials')
  }
})

module.exports = { userRegisterController, userLoginController }