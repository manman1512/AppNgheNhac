const user = require("../models/user.model");
const argon2 = require("argon2");
// const playlists = require('../models/playList.model')

module.exports = {
  //UPDATE
  update: async (req, res) => {
    const { _id } = req.user;
    const { password, displayName } = req.body;
    console.log("🚀 ~ file: user.controller.js:10 ~ update: ~ password:", password)
    if (!req.body.password) {
      delete req.body.password;
    }
    
      if (password === "" || !password) {
      // console.log(123)
      // console.log(_id)
      const updateUser = await user.findByIdAndUpdate(
        _id,
        {
          displayName,
        },
        { new: true }
      );
      console.log("🚀 ~ file: user.controller.js:25 ~ update: ~ updateUser:", updateUser)
      res.status(200).json({
        success: "true",
        message: "Cap nhat thanh cong!",
        updateUser,
      });
    } else {
      try {
        const hashedPass = await argon2.hash(password);
        const updateUser = await user.findByIdAndUpdate(
          _id,
          {
            password: hashedPass,
            displayName,
          },
          { new: true }
        );

        res.status(200).json({
          success: "true",
          message: "Cap nhat thanh cong!",
          updateUser,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Loi Server!" });
      }
    }
  },

  //GET USER
  getById: async (req, res) => {
    const { id } = req.params;

    try {
      const User = await user.findById(id);
      const { password, ...others } = User._doc;
      res.status(200).json(others);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  // GET ME
  getMe: async (req, res) => {
    const { _id } = req.user;
    try {
      const User = await user.findById(_id);
      
      if (User) {
        res.status(200).json({ success: true, User });
      } else {
        res
          .status(404)
          .json({ success: false, message: "User khong ton tai!" });
      }
    } catch (error) {
      // console.log(error);
      res.status(500).json(error);
    }
  },
  getImages: async (req, res) => {
    const { _id } = req.user;
    try {
      const User = await user.findById(_id);
      if (User) {
        res.status(200).json({ success: true, images: User.images });
      } else {
        res
          .status(404)
          .json({ success: false, message: "User khong ton tai!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  addImage: async (req, res) => {
    const { _id } = req.user;
    const { image } = req.body;
    try {
      const User = await user.findById(_id);
      console.log()
      if (User) {
        User.images.push(image);
        await User.save();
        res.status(200).json({ success: true, image: image });
      } else {
        res
          .status(404)
          .json({ success: false, message: "User khong ton tai!" });
      }
    } catch (error) {
      res.status(200).json(error);
    }
  },

  // get username
  // getUsername: async (req, res) => {
  //   try {
  //     const { username } = req.params;
  //     const name = await user.find({ username });
  //     res.status(200).json(name);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },
};
