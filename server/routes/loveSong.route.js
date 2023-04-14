const express = require("express");
const router = express.Router();

const {
  handleLoveSongById,
  // deleteLoveSongById,
  getLoveSongByUser,
  removeLoveSong
} = require("../controllers/loveSong.controller");
const { route } = require("./playList.route");

router.post("/handleLoveSongById/:songId", handleLoveSongById);
// router.delete("/deleteLoveSongById/:songId", deleteLoveSongById);
router.delete("/removeLoveSong", removeLoveSong);
router.get("/getLoveSongByUser", getLoveSongByUser);

module.exports = router;
