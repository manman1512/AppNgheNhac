// import NhacCuaTui from "nhaccuatui-api-full";
const {getHome, getSong} = require("../utils/nhaccuatui");

module.exports = {
    getHome: (async (req, res) => {
      try {
        const data = await getHome();
        res.status(200).json({
          data
        });
      } catch (error) {
        console.log(error.message);
          res.status(500).json({ message: 'Loi server' });
      }
      }),
    
      getSong: (async (req, res) => {
        const {key} = req.params
        try {
          const song = await getSong(key);
          res.status(200).json({
            song
          });
        } catch (error) {
          console.log(error);
            res.status(500).json({ message: 'Loi server' });
        }
        }),
      
        // getPlaylists: (async (req, res)=>{
        //   try {
        //     const playlists = await getPlaylists();
        //     res.status(200).json(playlists);
        //   } catch (error) {
        //     console.log(error);
        //     res.status(500).json({ message: 'Loi server' });
        //   }
        // })
}