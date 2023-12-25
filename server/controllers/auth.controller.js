const User = require('../models/user.model');
const { createLoginToken } = require('../middlewares/loginToken');
const bcrypt = require('bcryptjs');

const Login = async (req,res,next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({success: false, message: "Incorrect email or password"});
        }
        const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Incorrect email or password"});
        }
        const token = createLoginToken(existingUser.email, existingUser._id, existingUser.role);
        console.log(token);
        res.cookie("id",existingUser._id,{httponly:true})
        res.cookie("work_place",existingUser.work_place,{httponly:true})
        return res.cookie("token",token,{httponly:true}).json({message: "User logged in successfully", success: true, user: existingUser, token: token});
    } catch (err) {
        res.status(500).json({message: err.message});
        console.log(err);
    }
}

const Logout = async (req,res,next) => {
    try {
        res.clearCookie("token");
        res.clearCookie("id");
        console.log("Cookies cleared")
        res.status(200).json({message: "User logged out successfully"});
    } catch (err) {
        res.status(500).json({message: err.message});
        console.log(err);
    }
}

module.exports = { Login, Logout };