const { ZingMp3 } = require("zingmp3-api-full");

module.exports = {
  getArtist: async (req, res) => {
    const { name } = req.params;
    try {
      const data = await ZingMp3.getArtist(name);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  },

  getListArtistSong: async (req, res) => {
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
