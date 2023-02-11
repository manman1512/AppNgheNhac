const artists = require("../data/artist.json");
const fs = require("fs");
const path = require("path");

module.exports ={
  getSong: async (req, res) =>{
    const {id} = req.params;

    
  }
}


















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

//   getSong: async (req, res) => {
//     const { id } = req.params;
//     try {
//       const data = await ZingMp3.getSong(id);
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
