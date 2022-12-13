const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken")
const validateMongodbID = require("../utils/validateMongodbID");
const { isValidObjectId } = require("mongoose");

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
      _id: theUser?._id,
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

// api/users/
const fetchUsersController = expressAsyncHandler(async (req,res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.json(error)
  }
})


// api/users/delete/{id}
const deleteUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  validateMongodbID(id)

  try {
    const deleteUser = await User.findByIdAndDelete(id)
    res.json(deleteUser)
  } catch (error) { 
    res.json(error)
  }
})


// user details 

const fetchUserDetailsController = expressAsyncHandler(async (req, res) => { 
  const { id } = req.params
  validateMongodbID(id)
  try {
    const user = await User.findById(id)
    res.json(user)
  } catch (error) {
    res.json(error)
  }
})

module.exports = { userRegisterController, 
  userLoginController,
  fetchUsersController,
  deleteUserController,
  fetchUserDetailsController,
 }