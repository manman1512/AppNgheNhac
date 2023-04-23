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
  //////////////
  getSongByName: async (req, res) => {
    // try {
    //   const query = req.query.q; // Assuming the search query is passed as a URL query parameter named 'q'
    //   const regexQuery = new RegExp(query, 'i'); // Case-insensitive regex query
      
    //   const songs = await songs.find({ title: regexQuery }); // Assuming the song title is the property you're searching against
      
    //   res.json(songs);
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).json({ error: 'Internal server error' });
    // }
  },

  // GET ALL SONG
  getAllSong: async (req, res) => {
    const allSongs = await songs.find().populate('artist');;
    const first15Songs = allSongs.slice(36, 46);
    const Songs = first15Songs.map(({ _id, id, artist }) => ({
      _id,
      id,
      artist
    }))
    res.status(200).json(first15Songs);
  },

  // ADD SONG BY ADMIN
  addSong: async (req, res) => { },
  getLinkSong: async (req, res) => {
    const { id } = req.query;
    const songLink = await ZingMp3.getLinkSong(id);
    return res.json({
      link: songLink
    });

  },

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
  searchSongs: async(req,res)=>{
    const {title, take} = req.query;
    try{
      const songsResponse = await songs.find({
        name: new RegExp(title, "i")
      }
      ).limit(take).populate("artist")
      return res.status(200).json({
        songs: songsResponse.map((data)=> ({
          _id: data._id,
          id: data.id,
          artist: data.artist,
          thumbnail: data.thumbnail,
          name: data.name,

        }))
      })
    }catch(error){
      return res.status(500).json({message: error.message});
    }
  }
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
