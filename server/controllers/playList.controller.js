const Playlists = require("../models/playList.model");
const user = require("../models/user.model");
const Songs = require("../models/song.model");
const { ZingMp3 } = require("zingmp3-api-full");
const { getSongLink } = require("../utils/getSongLink");
const playListModel = require("../models/playList.model");

async function create({
  owner,
  title,
  description,
  thumbnail = "null",
  song = [],
}) {
  const newPlaylist = await Playlists.create({
    owner,
    title,
    description,
    thumbnail,
    listSong: song,
  });
  return newPlaylist.save();
}

const createPlayList = async (req, res) => {
  const { _id } = req.user;
  const { title, description, thumbnail = null, song = [] } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title khong duoc trong!" });
  }
  try {
    const playlist = await Playlists.findOne({ title });
    const User = await user.findById(_id);
    // console.log(User)
    if (playlist) {
      return res
        .status(400)
        .json({ success: false, message: "Playlist da ton tai!" });
    } else {
      const newPlaylist = await create({
        owner: User._id,
        title,
        thumbnail,
        description,
      });
      await User.updateOne({ $push: { playList: newPlaylist } });
      // await playList.updateOne({ $pull: { listSong: songId } });
      // return res.status(200).json(newPlaylist);

      // Lấy tất cả các playlist
      const playlists = await Playlists.find({});

      // Trả về toàn bộ playlist
      return res.status(200).json(playlists);
    }
    // console.log(User.playList)
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createPlayList,
  create,

  // ADD SONG ON PLAYLIST
  addSongById: async (req, res) => {
    const { playListId, songId } = req.body;
    // console.log(req.body);
    const { _id } = req.user;
    // console.log(songId)
    try {
      const playList = await Playlists.findById(playListId).populate("owner");
      const exist = await Playlists.findById(playListId);
      if (playList.owner._id.toString() === _id) {
        if (!exist) {
          return res.status(400).send("Playlist khong ton tai!");
        }
        const song = await Songs.findById(songId).populate("artist");
        if (exist.listSong.includes(song._id))
          return res.status(409).json({ msg: "Bai hat da ton tai" });
        // console.log(exist.listSong.includes(song._id));
        // exist.save();
        // console.log(song)
        exist.listSong.push(song);
        exist.save();
        res.json({ msg: "Them bai hat thanh cong", song });
      } else {
        res.status(401).json("Chi Them duoc playlist cua ban!");
      }
    } catch (error) {
      throw new Error(error);
    }
  },

  // DELETE PLAYLIST
  deletePlayListById: async (req, res) => {
    const { _id } = req.user;
    const { playListId } = req.params;
    // console.log()
    try {
      const playList = await Playlists.findById(playListId).populate("owner");
      // console.log(playList.owner._id);
      // console.log(playList)

      if (playList.owner._id.toString() === _id) {
        try {
          await playList.delete();
          res.status(200).json({
            success: true,
            message: "Delete playlist thanh cong!",
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Loi server" });
        }
      } else {
        res.status(401).json("Chi xoa duoc playlist cua ban!");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Loi server" });
    }
  },

  // DELETE SONG ON PLAYLIST
  deleteSongById: async (req, res) => {
    const { playListId, songId } = req.params;
    const { _id } = req.user;
    try {
      const playList = await Playlists.findById(playListId).populate(
        "listSong"
      );

      if (playList.owner._id.toString() === _id) {
        try {
          await playList.updateOne({ $pull: { listSong: songId } });
          // `updateOne()` => xóa ròi cập nhật lại playlist
          // `$pull` để xóa phần tử khỏi mảng => cập nhật lại listsong

          res.status(200).json({ message: "Xoa bai hat thanh cong!" });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Khong tim thay bai hat" });
        }
      } else {
        res.status(401).json("Username khong dung!");
      }
    } catch (error) {
      console.log(error);
    }
  },

  // UPDATE INFOR PLAYLIST
  updatePlayListById: async (req, res) => {
    const { _id } = req.user;
    const { playListId } = req.params;
    const update = {};
    if (req.body.title) {
      update.title = req.body.title;
    }
    if (req.body.description) {
      update.description = req.body.description;
    }

    try {
      const playList = await Playlists.findById(playListId).populate("owner");
      // const exist = await Playlists.findById(playListId);

      if (playList.owner._id.toString() === _id) {
        // if (!exist) return res.status(400).send("Playlist khong ton tai!");
        try {
          const updatePlaylist = await Playlists.findByIdAndUpdate(
            playListId,
            { $set: update },
            { new: true }
          );
          // console.log(updatePlaylist)
          res
            .status(200)
            .json({
              message: "Update thanh cong", update: {
                _id: playListId,
                update
              }
            });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Loi server" });
        }
      } else {
        res.status(401).json("Username khong dung!");
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send("Chi sua duoc playlist cua ban!");
    }
  },

  getPlaylistByUser: async (req, res) => {
    const { _id } = req.user;
    // console.log(_id);
    try {
      const User = await user.findOne({ _id: _id }).populate({
        path: "playList",
        // populate: { path: "listSong", model: "songs" },
      });
      // console.log("🚀 ~ file: playList.controller.js:171 ~ getPlaylistByUser:async ~ User:", User)
      // console.log(User)
      // const playLists = await Playlists.find({owner: user._id})
      const playlists = User.playList.map((p) => ({
        _id: p._id,
        title: p.title,
        description: p.description,
        thumbnail: p.thumbnail,
        updatedAt: p.updatedAt
      }))
      res.status(200).json({
        playlists,
        User: User.username,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  //GET PLAYLIST BY ID
  getPlaylistById: async (req, res) => {
    const { idPlaylist } = req.params;
    const { _id } = req.user;
    // console.log(_id);
    try {
      const User = await user.findOne({ _id: _id }).populate({
        path: "playList",
        // populate: { path: "listSong", model: "songs" },
      });

      const playlist = await Playlists.findById(idPlaylist).populate("listSong");
      // const songs = User.playList[0].listSong; //User.playList[0].listSong.length
      const songs = playlist.listSong.map(({ _id, id, artist }) => ({
        _id,
        id,
        artist
      }))

      const listSong = await getSongLink(playlist.listSong);
      playlist.listSong = listSong
      // console.log(listSong)
      res.status(200).json({
        playlist,
        listSong
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getSongsByPlaylist: async (req, res) => {
    const { playlistId } = req.query;
    const playlist = await playListModel.findById(playlistId).populate({
      path: "listSong",
      populate: {
        path: "artist",
        model: "artists"
      }

    });
    return res.json(playlist.listSong.map(l => ({
      _id: l._id,
      id: l.id,
      name: l.name,
      thumbnail: l.thumbnail,
      artist: l.artist
    })))

  }
};


// const { getTop100 } = require("nhaccuatui-api-full");

// getDetailPlaylistMP3: async (req, res) => {
//   const { id } = req.params;
//   try {
//     const data = await ZingMp3.getDetailPlaylist(id);
//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//   }
// },
//   //   createPlaylist: async (req, res) => {
//   //     const { _id } = req.user;
//   //     const { title } = req.body;
//   //     const newPlaylist = new playlist({ owner: _id, title });
//   //     try {
//   //       // console.log(newPlaylist);
//   //       const savePlaylist = await newPlaylist.save();
//   //       res
//   //         .status(200)
//   //         .json({ message: "Tao playlist thanh cong!", data: savePlaylist });
//   //     } catch (error) {
//   //       console.log(error);
//   //       res.status(409).json({
//   //         success: false,
//   //         message: "Title khong duoc trung hoac thieu!",
//   //       });
//   //     }
//   //   },
//   // getTop100: async (req, res) => {
//   //   const {id} = req.params;
//   //   try {
//   //     const data = await getTop100(id);
//   //     res.json(data);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // },
// };
