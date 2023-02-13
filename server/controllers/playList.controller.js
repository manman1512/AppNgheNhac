const Playlists = require("../models/playList.model");
const user = require("../models/user.model");
const Songs = require("../models/song.model")

const create = async ({owner, title, thumbnail = "null", song = []})=>{
  const newPlaylist = await Playlists.create({owner, title, thumbnail, listSong: song})
  return newPlaylist.save();
}

const createPlayList = (
  async (req, res) => {
    const { _id } = req.user;
    const { title, thumbnail = null, song = [] } = req.body;
    if (!title){
      return res
        .status(400)
        .json({ success: false, message: "Title khong duoc trong!" });
    }
    // console.log(newPlayList)
    try {
      const playList = await Playlists.findOne({title});
      if (playList) {
        res.status(400).json({ success: false, message: "Playlist da ton tai!" });
      } else{
        const newPlaylist = await create({onwer: _id, title, thumbnail})
        return res.status(200).json(newPlaylist);
      }
    } catch (error) {
      console.error(error);
    }
  }
)

module.exports = {
  createPlayList,
  create,
  addSongByUser: async (req, res) => {
    const {playListId, songId} = req.params;
    try {
      const exist = await Playlists.findById(playListId);
      if(!exist) {
        return res.status(400).send("Playlist khong ton tai!");
      }
      const song = await Songs.findOne({  
        id: songId,
      })
      if(exist.listSong.includes(song._id)) return res.json({msg: "Bai hat da ton tai"});
      console.log(exist.listSong.includes(song._id));
      // exist.save();
      // console.log(song)
      exist.listSong.push(song);
      exist.save();
      res.json({msg: "add success"})
    } catch (error) {
      throw new Error(error);
    } 
  }
};

















// // const { getTop100 } = require("nhaccuatui-api-full");
// const { ZingMp3 } = require("zingmp3-api-full");

// module.exports = {

//   getDetailPlaylist: async (req, res) => {
//     const { id } = req.params;
//     try {
//       const data = await ZingMp3.getDetailPlaylist(id);
//       res.status(200).json(data);
//     } catch (error) {
//       console.log(error);
//     }
//   },

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
