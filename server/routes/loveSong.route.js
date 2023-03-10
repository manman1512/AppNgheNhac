const express = require("express");
const router = express.Router();

const {
  addLoveSongById,
  deleteLoveSongById,
  getLoveSongByUser
} = require("../controllers/loveSong.controller");

router.post("/addLoveSongById/:songId", addLoveSongById);
router.delete("/deleteLoveSongById/:songId", deleteLoveSongById);
router.get("/getLoveSongByUser", getLoveSongByUser);

module.exports = router;
