const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken")
const validateMongodbID = require("../utils/validateMongodbID");
const { isValidObjectId } = require("mongoose");
const { json } = require("express");

const userRegisterController = expressAsyncHandler(async (req, res) => {
  const isUserExist = await User.findOne({ email: req?.body?.email });
  if (isUserExist) throw new Error("User already exists");

  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    console.log(req.body);
    res.json("User register success");
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

const userProfileController = expressAsyncHandler(async (req, res) => { 
  const { id } = req.params
  validateMongodbID(id)

  try {
    const profile = await User.findById(id);
    res.json(profile)

  } catch (err) {
    res.json(`error: ${err.message}`)
  }
})

const updateUserController = expressAsyncHandler(async (req, res) => { 
  const { _id } = req?.user
  validateMongodbID(id) 

  const user = await User.findByIdAndUpdate(_id, {
    firstName: req?.body?.firstName,
    lastName: req?.body?.lastName,
    email: req?.body?.email,
    bio: req?.body?.bio
  }, {
    new: true,
    runValidators: true
  });
  res.json(user)
})

const updateUserPasswordController = expressAsyncHandler(async (req, res) => {
   const { _id } = req.user
   const { password } = req.body
   validateMongodbID(_id)

   const user = User.findById(_id)

   if (password) {
    user.password = password
    const updatedUser = await user.save()
    res.json(updatedUser)
   } else {
    res.json(user);
   }
})


const followingUserController = expressAsyncHandler(async (req, res) => {
  const { followId } = req.body
  const loginUserId = req.user.id

  const targetUser = await User.findById(followId)
  const alreadyFollowing = targetUser.followers?.find (
    user => user?.toString() === loginUserId.toString()
  )

  await User.findByIdAndUpdate(followId, {
    $push: { followers: loginUserId },
    isFollowing: true
  }, 
  { new: true })

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    {new: true })
  res.json("following user update success")
})


const unfollowUserController = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    { new: true }
  );

  res.json("You have successfully unfollowed this user");
});


module.exports = { userRegisterController, 
  userLoginController,
  fetchUsersController,
  deleteUserController,
  fetchUserDetailsController,
  userProfileController,
  updateUserController,
  updateUserPasswordController,
  followingUserController,
  unfollowUserController
 }