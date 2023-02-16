const express = require("express");
const router = express.Router();

const {
  createPlayList,
  addSongById,
  deletePlayListById,
  getDetailPlaylistMP3
} = require("../controllers/playList.controller");

router.post("/createPlayList", createPlayList);
router.post("/addSongById/:playListId/:songId", addSongById);
router.delete("/deletePlayListById/:playListId", deletePlayListById);
// router.post('', addSongByUser)
// router.get('/getDetailPlaylistMP3/:id', getDetailPlaylistMP3)
// router.get("/getTop100/:id", getTop100);
// router.get("/getPlaylist", getPlaylist)
module.exports = router;
