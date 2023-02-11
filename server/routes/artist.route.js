const express = require('express');
const router = express.Router();

// const {getArtist, getListArtistSong} = require('../controllers/artist.controller')
// router.get('/getArtist/:name', getArtist)
// router.get('/getListArtistSong/:id/:page/:count', getListArtistSong)


const {getArtist, getListSongByArtist} = require('../controllers/artist.controller')
router.get('/getArtist/:name', getArtist)
router.get("/getListSongByArtist/:id", getListSongByArtist)


module.exports = router;