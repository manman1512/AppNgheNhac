const express = require('express');
const router = express.Router();

const {createPlayList, addSongByUser} = require('../controllers/playList.controller')

router.post('/createPlayList', createPlayList)
router.post("/addSongByUser/:playListId/:songId", addSongByUser)
// router.post('', addSongByUser)
// const {getTop100, getPlsaylist, getDetailPlaylist} = require('../controllers/playList.controller')
// router.get('/getDetailPlaylist/:id', getDetailPlaylist)
// router.get("/getTop100/:id", getTop100);
// router.get("/getPlaylist", getPlaylist)
module.exports = router;
