const express = require("express");
const router = express.Router();

const { createuser } = require("../controllers/user.controller");

router.post("/", createuser);

module.exports = router;
