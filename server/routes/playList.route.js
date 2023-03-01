const express = require("express");
const router = express.Router();

const {
  createPlayList,
  addSongById,
  deletePlayListById,
  deleteSongById,
  updatePlayListById
} = require("../controllers/playList.controller");

router.post("/createPlayList", createPlayList);
router.post("/addSongById/:playListId/:songId", addSongById);
router.delete("/deletePlayListById/:playListId", deletePlayListById);
router.delete('/deleteSongById/:playListId/:songId', deleteSongById)
router.patch('/updatePlayListById/:playListId', updatePlayListById)
// router.get("/getTop100/:id", getTop100);
// router.get("/getPlaylist", getPlaylist)
module.exports = router;
