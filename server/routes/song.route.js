const express = require('express');
const router = express.Router();

const {getSong, getAllSong, getHomeMp3, getSongMP3, getSongByName, searchSongs} = require('../controllers/song.controller')

router.get('/getSong/:id', getSong)
router.get('/getSongByName', getSongByName)
router.get('/getAllSong', getAllSong)

router.get('/getSongMP3/:id', getSongMP3)
router.get('/getHomeMp3', getHomeMp3)
router.get("/search", searchSongs)

module.exports = router;













// const {getInfoSong, getTop100, getSong, getHome, getLyric, searchSong} = require('../controllers/song.controller')

// router.get('/getHome', getHome)
// router.get('/getTop100', getTop100)
// router.get('/getInfoSong/:id', getInfoSong)
// router.get('/getLyric/:id', getLyric)
// router.get('/searchSong/:name', searchSong)

module.exports = router;
