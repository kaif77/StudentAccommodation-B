const express = require("express");
const router = express.Router();

const { checkRoomAvalability } = require("../controllers/room.controller");

router.get("/", checkRoomAvalability);

module.exports = router;
