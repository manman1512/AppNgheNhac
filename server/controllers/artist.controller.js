const artists = require("../data/artist.json");
const Artists = require("../models/artist.model")
const fs = require("fs");
const path = require("path");
const { ZingMp3 } = require("zingmp3-api-full");

module.exports = {
  getArtist: (req, res) => {
    const { name } = req.params;
    try {
      const artist = artists.filter((a) => a.name.toLowerCase().includes(name));
      console.log(artist);
      res.status(200).json(artist);
    } catch (error) {
      console.log(error);
    }
  },

  getArtistById: async (req, res) => {
    const { idArtist } = req.params;
    console.log(idArtist);
    try {
      const artist = await Artists.findById(idArtist);
      if (artist) {
        console.log(artist);
        return res.status(200).json(artist);
      } else {
        return res.status(400).json({
          message: "Khoong tim thasy!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  getListSongByArtist: (req, res) => {
    const { id } = req.params;
    try {
      const artist = artists.find((a) => a.id === id);
      // console.log(artist);
      if (artist) {
        const data = fs.readFileSync(
          path.join(__dirname, "..", "data", `${artist.id}.json`),
          "utf-8"
        );

        return res.json(JSON.parse(data));
      }
      return res.json({
        error: true,
        msg: "Not artist found",
      });
    } catch (error) {
      console.log(error);
    }
  },

  getArtistMP3: async (req, res) => {
    const { name } = req.params;
    try {
      const data = await ZingMp3.getArtist(name);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  },

  getListArtistSongMP3: async (req, res) => {
    const { id } = req.params;
    const { page } = req.params;
    const { count } = req.params;
    try {
      const data = await ZingMp3.getListArtistSong(id, page, count);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  },
};

// const { ZingMp3 } = require("zingmp3-api-full");

// module.exports = {
//   getArtist: async (req, res) => {
//     const { name } = req.params;
//     try {
//       const data = await ZingMp3.getArtist(name);
//       res.status(200).json(data);
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   getListArtistSong: async (req, res) => {
//     const { id } = req.params;
//     const { page } = req.params;
//     const { count } = req.params;
//     try {
//       const data = await ZingMp3.getListArtistSong(id, page, count);
//       res.status(200).json(data);
//     } catch (error) {
//       console.log(error);
//     }
//   },
// };
