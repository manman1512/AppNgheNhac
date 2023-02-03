const express = require('express');
const router = express.Router();

const {createPlaylist} = require('../controllers/playList.controller')

router.post("/createPlaylist", createPlaylist);
module.exports = router;
