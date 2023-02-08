const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { json } = require("express");
const user = require("../models/user.model");

module.exports = {
    // REGISTER
    register: async (req, res) => {
    const { username, password, passwordConfirm, displayName } = req.body;
  
    if (!username || !password || !passwordConfirm || !displayName) {
      return res
        .status(400)
        .json({ success: false, message: "Thieu username hoac password hoac displayName!" });
    }
    try {
      const User = await user.findOne({ username });
      if (User)
        return res
          .status(400)
          .json({ success: false, message: "Username da ton tai!" });
  
      if (password !== passwordConfirm) {
        return res
          .status(400)
          .json({ success: false, message: "Password nhap lai khong dung!" });
      }
      // All good
      const hashedPass = await argon2.hash(password);
      const newUser = new user({ username, displayName, password: hashedPass });
      await newUser.save();
  
      // return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );
  
      res.json({ success: true, message: "Tao User thanh cong!", accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Loi Server!" });
    }
  },
  
  // LOGIN
  login : async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Thieu username hoac password!" });
    }
    try {
      const User = await user.findOne({username})
      if(!User)
          return res
          .status(400)
          .json({ succes: false, mesage: 'Username hoac Passwowd khong dung!' });
      // console.log(password);
      // console.log(User.password)
      const passswordValid = await argon2.verify(User.password, password); //verify -> kiem chung
  
      if (!passswordValid)
        return res
          .status(400)
          .json({ success: false, message: 'Username hoac Password khong dung!' });
      
      // All okay => return token
      const accessToken = jwt.sign({ _id: User._id, username: User.username }, process.env.ACCESS_TOKEN_SECRET);
      // console.log("🚀 ~ file: auth.controller.js ~ line 71 ~ login: ~ accessToken", accessToken)
  
      res.json({ success: true, message: 'Dang nhap thanh cong!', accessToken, User});
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Loi Server!' });
    }
  },
}


