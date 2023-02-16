const express = require("express");
const router = express.Router();

// const {getArtist, getListArtistSong} = require('../controllers/artist.controller')
// router.get('/getArtist/:name', getArtist)
// router.get('/getListArtistSong/:id/:page/:count', getListArtistSong)

const {
  getArtist,
  getListSongByArtist,
  getArtistMP3,
  getListArtistSongMP3
} = require("../controllers/artist.controller");
router.get("/getArtist/:name", getArtist);
router.get("/getListSongByArtist/:id", getListSongByArtist);
router.get("/getArtistMP3/:name", getArtistMP3);
router.get("/getListArtistSongMP3/:id", getListArtistSongMP3);

module.exports = router;
