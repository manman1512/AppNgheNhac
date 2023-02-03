const express = require('express');
const router = express.Router();
// const NhacCuaTui = require("nhaccuatui-api-full");

const {getHome, getSong} = require('../controllers/song.controller')

router.get('/getHome', getHome)
router.get('/getSong/:key', getSong)
// router.get('/getPlaylists', getPlaylists)

module.exports = router;
