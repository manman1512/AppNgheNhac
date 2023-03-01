const express = require('express');
const router = express.Router();

const {addLoveSongById, deleteLoveSongById} = require('../controllers/loveSong.controller')

router.post('/addLoveSongById/:songId', addLoveSongById)
router.delete('/deleteLoveSongById/:songId', deleteLoveSongById)

module.exports = router;