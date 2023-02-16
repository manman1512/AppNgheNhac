const artists = require("../data/artist.json");
const fs = require("fs");
const path = require("path");
const { ZingMp3 } = require("zingmp3-api-full");

module.exports = {
  getArtist: (req, res) => {
    const { name } = req.params;
    try {
      // console.log(artist);
      const artist = artists.filter((a) => a.name.toLowerCase().includes(name));
      res.status(200).json(artist);
      // console.log(artist[0].id);
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
