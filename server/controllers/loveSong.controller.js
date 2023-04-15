const songs = require("../models/song.model");
const User = require("../models/user.model");
const { ZingMp3 } = require("zingmp3-api-full");
const { getSongLink } = require("../utils/getSongLink");

module.exports = {
  handleLoveSongById: async (req, res) => {
    const { _id } = req.user;
    const { songId } = req.params;

    try {
      const user = await User.findById(_id).populate("loveSong");
      const song = await songs.findById(songId).populate("artist");
      // console.log(loveSong)
      if (!song) {
        return res.status(400).send("Bai hat khong tim thay!");
      }
      const { loveSong } = user;
      const isExist = loveSong.filter(
        (s) => s._id.toString() === song._id.toString()
      );


      // if (isExist.length > 0) {
      //   return res.status(400).json({
      //     message: "Bai hat da ton tai",
      //   });
      // }
      if (isExist.length > 0) {
        // console.log(isExist);
        await user.updateOne({ $pull: { loveSong: songId } });
        // `updateOne()` => xóa ròi cập nhật lại playlist
        // `$pull` để xóa phần tử khỏi mảng => cập nhật lại listsong

        res.status(200).json({ message: "Xoa bai hat thanh cong!", _id: songId });
      } else {
        await user.updateOne({ $push: { loveSong: songId } });
        res.status(200).json({ message: "Thêm bai hat yêu thích thanh cong!", song:{
          id: song.id,
          _id: song._id,
          name: song.name,
          thumbnail: song.thumbnail,
          artist:song.artist
        } });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // deleteLoveSongById: async (req, res) => {
  //   const { _id } = req.user;
  //   const { songId } = req.params;
  //   try {
  //     const user = await User.findById(_id).populate("loveSong");
  //     // console.log(user)
  //     if (user._id.toString() === _id) {
  //       console.log(user._id);
  //       try {
  //         await user.updateOne({ $pull: { loveSong: songId } });
  //         // `updateOne()` => xóa ròi cập nhật lại playlist
  //         // `$pull` để xóa phần tử khỏi mảng => cập nhật lại listsong

  //         res.status(200).json({ message: "Xoa bai hat thanh cong!" });
  //       } catch (error) {
  //         console.log(error);
  //         res.status(500).json({ message: "Khong tim thay bai hat" });
  //       }
  //     } else {
  //       res.status(401).json("Chỉ xóa được bài hát yêu thích của bạn!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  removeLoveSong: async (req, res) => {
    const { songId } = req.query;
    const { _id } = req.user;
    const song = await songs.findById(songId);
    const user = await User.findById(_id);
    if (!song) {
      return res.status(404).json({
        msg: "Not found song!"
      })
    }
    if (!user) {
      return res.status(404).json({
        msg: "Not found user"
      })
    }
    await user.updateOne({
      $pull: {
        loveSong: song._id
      }
    })
    return res.status(200).json({
      msg: "Remove love song successfull",
      song
    })

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
      // console.log("🚀 ~ file: loveSong.controller.js:73 ~ getLoveSongByUser: ~ loveSong:", loveSong)

      res.status(200).json({
        lovesong: loveSong.map(ls => ({
          id: ls.id,
          _id: ls._id,
          thumbnail: ls.thumbnail,
          name: ls.name,
          artist: ls.artist
        })),
        User: user.username,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
