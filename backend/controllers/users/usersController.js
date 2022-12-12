const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");

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

module.exports = { userRegisterController };