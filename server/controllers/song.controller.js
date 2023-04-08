const songs = require("../models/song.model");
const artists = require("../models/artist.model")
const user = require("../models/user.model");
const { ZingMp3 } = require("zingmp3-api-full");

module.exports = {
  getSong: async (req, res) => {
    const { id } = req.params;
    try {
      const song = await songs.findOne({ id });
      if (songs) {
        res.status(200).json(song);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // GET ALL SONG
  getAllSong: async (req, res) => {
    const allSongs = await songs.find().populate('artist');;
    const first15Songs = allSongs.slice(36, 46);
    const Songs = first15Songs.map(({_id, id, artist}) => ({
      _id,
      id,
      artist
    }))
   

    // console.log(Songs)
    res.status(200).json(first15Songs);
  },

  // ADD SONG BY ADMIN
  addSong: async (req, res) => {},

  getHomeMp3: async (req, res) => {
    try {
      const data = await ZingMp3.getHome();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  },

  getSongMP3: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await ZingMp3.getSong(id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  },
};

// const { ZingMp3 } = require("zingmp3-api-full");

// module.exports = {
//   getHome: async (req, res) => {
//     try {
//       const data = await ZingMp3.getHome();
//       res.status(200).json(data);
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   getTop100: async (req, res) => {
//     try {
//       const data = await ZingMp3.getTop100();
//       res.status(200).json(data);
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   getInfoSong: async (req, res) => {
//     const { id } = req.params;
//     try {
//       const data = await ZingMp3.getInfoSong(id);
//       res.status(200).json(data);
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   getLyric: async (req, res) => {
//     const { id } = req.params;
//     try {
//       const data = await ZingMp3.getLyric(id);
//       res.status(200).json(data);
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   searchSong: async (req, res) => {
//     const { name } = req.params;
//     try {
//       const data = await ZingMp3.search(name);
//       res.status(200).json(data);
//     } catch (error) {
//       console.log(error);
//     }
//   },
// };
