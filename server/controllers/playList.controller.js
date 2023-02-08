// const { getTop100 } = require("nhaccuatui-api-full");
const { ZingMp3 } = require("zingmp3-api-full");

module.exports = {

  getDetailPlaylist: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await ZingMp3.getDetailPlaylist(id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  },

  //   createPlaylist: async (req, res) => {
  //     const { _id } = req.user;
  //     const { title } = req.body;
  //     const newPlaylist = new playlist({ owner: _id, title });
  //     try {
  //       // console.log(newPlaylist);
  //       const savePlaylist = await newPlaylist.save();
  //       res
  //         .status(200)
  //         .json({ message: "Tao playlist thanh cong!", data: savePlaylist });
  //     } catch (error) {
  //       console.log(error);
  //       res.status(409).json({
  //         success: false,
  //         message: "Title khong duoc trung hoac thieu!",
  //       });
  //     }
  //   },
  // getTop100: async (req, res) => {
  //   const {id} = req.params;
  //   try {
  //     const data = await getTop100(id);
  //     res.json(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};
