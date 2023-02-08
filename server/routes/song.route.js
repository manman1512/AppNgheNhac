const express = require('express');
const router = express.Router();

const {getInfoSong, getTop100, getSong, getHome, getLyric, searchSong} = require('../controllers/song.controller')

router.get('/getSong/:id', getSong)
router.get('/getHome', getHome)
router.get('/getTop100', getTop100)
router.get('/getInfoSong/:id', getInfoSong)
router.get('/getLyric/:id', getLyric)
router.get('/searchSong/:name', searchSong)

module.exports = router;
