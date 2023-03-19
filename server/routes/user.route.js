const express = require("express");
const router = express.Router();

const {
  update,
  deleteById,
  getById,
  getMe,
  getImages,
  addImage,
  getUsername,
  addPlayList,
  // validatePass
} = require("../controllers/user.controller");

router.put("/update", update);
// router.delete('/deleteById/:id', deleteById);
router.get("/getById/:id", getById);
router.get("/getMe", getMe);
router.get("/getImages", getImages);
router.post("/addImage", addImage);
// router.post("/validatePass", validatePass)
// router.get("/getUsername/:username", getUsername);
// router.post("/addPlayList", addPlayList);

module.exports = router;
