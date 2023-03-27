const songs = require("../models/song.model");
const User = require("../models/user.model");
const { ZingMp3 } = require("zingmp3-api-full");
const { getSongLink } = require("../utils/getSongLink");

module.exports = {
  addLoveSongById: async (req, res) => {
    const { _id } = req.user;
    const { songId } = req.params;

    try {
      const user = await User.findById(_id).populate("loveSong");
      const song = await songs.findById(songId);
      // console.log(loveSong)
      if (!song) {
        return res.status(400).send("Bai hat khong tim thay!");
      }
      const { loveSong } = user;
      const isExist = loveSong.filter(
        (s) => s._id.toString() === song._id.toString()
      );
      //   console.log("🚀 ~ file: loveSong.controller.js:20 ~ addLoveSongById: ~ isExist:", isExist.length)
      if (isExist.length > 0) {
        return res.status(400).json({
          message: "Bai hat da ton tai",
        });
      }

      await user.updateOne({ $push: { loveSong: songId } });
      res.status(200).json({ message: "Thêm bai hat yêu thích thanh cong!" });
      //   console.log(loveSong);
    } catch (error) {
      console.log(error);
    }
  },

  deleteLoveSongById: async (req, res) => {
    const { _id } = req.user;
    const { songId } = req.params;
    try {
      const user = await User.findById(_id).populate("loveSong");
      // console.log(user)
      if (user._id.toString() === _id) {
        console.log(user._id);
        try {
          await user.updateOne({ $pull: { loveSong: songId } });
          // `updateOne()` => xóa ròi cập nhật lại playlist
          // `$pull` để xóa phần tử khỏi mảng => cập nhật lại listsong

          res.status(200).json({ message: "Xoa bai hat thanh cong!" });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Khong tim thay bai hat" });
        }
      } else {
        res.status(401).json("Chỉ xóa được bài hát yêu thích của bạn!");
      }
    } catch (error) {
      console.log(error);
    }
  },

  getLoveSongByUser: async (req, res) => {
    const { _id } = req.user;
    try {
      // const user = await User.findOne({_id}).populate("loveSong");
      const user = await User.findOne({ _id }).populate({
        path: "loveSong",
        // populate: {path: "artist"}
      });
      
      const loveSong = await getSongLink(user.loveSong);
      console.log("🚀 ~ file: loveSong.controller.js:73 ~ getLoveSongByUser: ~ loveSong:", loveSong)
      
      res.status(200).json({
        lovesong: loveSong,
        User: user.username,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
