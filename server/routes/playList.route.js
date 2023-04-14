const express = require("express");
const router = express.Router();

const {
  createPlayList,
  addSongById,
  deletePlayListById,
  deleteSongById,
  updatePlayListById,
  getPlaylistByUser,
  getPlaylistById,
  getSongsByPlaylist
} = require("../controllers/playList.controller");

router.post("/createPlayList", createPlayList);
router.post("/addSongById", addSongById);
router.delete("/deletePlayListById/:playListId", deletePlayListById);
router.get("/getSongsByPlaylist", getSongsByPlaylist)
router.delete('/deleteSongById/:playListId/:songId', deleteSongById)
router.patch('/updatePlayListById/:playListId', updatePlayListById)
router.get('/getPlaylistByUser', getPlaylistByUser)
router.get('/getPlaylistById/:idPlaylist', getPlaylistById)
// router.get("/getTop100/:id", getTop100);
// router.get("/getPlaylist", getPlaylist)
module.exports = router;
