import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "./../utils/authHelper.js";
import JWT from "jsonwebtoken";

//POST REGISTER
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validaiton
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    //existing user
    const existinguser = await userModel.findOne({ email });

    if (existinguser) {
      return res.status(200).send({
        success: true,
        message: "Already Registerd please login",
      });
    }

    // register new user
    const hashedPassword = await hashPassword(password);

    //save in database
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

//POST LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    //checkuser
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered",
      });
    }

    const match = comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  res.send({
    message: "protectedRoutes",
  });
};

