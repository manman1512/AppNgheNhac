const playlist = require("../models/playList.model");
// const user = require("../models/user.model");

module.exports = {
  createPlaylist: async (req, res) => {
    const { _id } = req.user;
    const { title } = req.body;
    const newPlaylist = new playlist({ owner: _id, title });
    try {
      // console.log(newPlaylist);
      const savePlaylist = await newPlaylist.save();
      res
        .status(200)
        .json({ message: "Tao playlist thanh cong!", data: savePlaylist });
    } catch (error) {
      console.log(error);
      res.status(409).json({
        success: false,
        message: "Title khong duoc trung hoac thieu!",
      });
    }
  },
};
