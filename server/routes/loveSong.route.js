const express = require("express");
const router = express.Router();

const {
  handleLoveSongById,
  // deleteLoveSongById,
  getLoveSongByUser
} = require("../controllers/loveSong.controller");

router.post("/handleLoveSongById/:songId", handleLoveSongById);
// router.delete("/deleteLoveSongById/:songId", deleteLoveSongById);
router.get("/getLoveSongByUser", getLoveSongByUser);

module.exports = router;
