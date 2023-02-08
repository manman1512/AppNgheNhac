const express = require('express');
const router = express.Router();

const {getTop100, getPlaylist, getDetailPlaylist} = require('../controllers/playList.controller')

router.get('/getDetailPlaylist/:id', getDetailPlaylist)

// router.get("/getTop100/:id", getTop100);
// router.get("/getPlaylist", getPlaylist)
module.exports = router;
