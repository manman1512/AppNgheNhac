const express = require('express');
const router = express.Router();
// const NhacCuaTui = require("nhaccuatui-api-full");

const {register, login } = require('../controllers/auth.controller')

router.post("/register", register);
router.post("/login", login);

module.exports = router;
