const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const generateToken = require('../config/generateToken');
const bcrypt = require("bcryptjs");

const registerController = async (req, res,next) => {
  const { name, email, password } = req.body;
  try {
    //check to see if user already exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      throw new Error("user is already registered");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser =await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).send({
      success: true,
      message: "User created successfully",
      data:newUser
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const LoginController = async (req, res) => {
  const { password, email } = req.body;
  try {
   
    // check if the user exists
    const user= await User.findOne({email:req.body.email})
    if(!user){
       throw new Error("User not found")
    }

    // compare passwords
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if(!validPassword){
        throw new Error("Invalid password")
      }

    const token  = await jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"2d"})
    res.send({
      success:true,
      message: "User loggined successfully",
      token: token
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const CurrentUserController = async (req, res) => {
   
  try {
     const user = await User.findById(req.body.userId)
     res.send({
       success:true,
       message:"User fetch successfully",
       data:user
    })
  }catch(error){
     res.send({
       success: false,
       message: error.message
     })
  }
}
module.exports = {
  registerController,
  LoginController,
  CurrentUserController,
};
