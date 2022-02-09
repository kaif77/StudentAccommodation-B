const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUsers,
  getUsers,
  getUserByUniId,
  deleteUser,
  login,
} = require("../controllers/user.controller");
const { authUser } = require("../middleware/auth");


router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserByUniId);
router.patch("/", updateUsers);
router.delete("/",authUser, deleteUser);

router.post("/login", login);

module.exports = router;
