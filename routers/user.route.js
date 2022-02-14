const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUsers,
  getUsers,
  getUserByUniId,
  deleteUser,
  getMaxUserId,
  login,
} = require("../controllers/user.controller");
const { authUser, authRole } = require("../middleware/auth");

router.post("/", createUser);
router.get("/", authUser, authRole(["admin"]), getUsers);
router.get("/maxid", authUser, authRole(["admin"]), getMaxUserId);
router.get("/:id", authUser, authRole(["admin", "student"]), getUserByUniId);
router.patch("/", authUser, authRole(["admin", "student"]), updateUsers);
router.delete("/", authUser, authRole(["admin"]), deleteUser);

router.post("/login", login);

module.exports = router;

// ? authuser => need valid JWTtoken
// ! authRole(["admin"]) => only admin can access this route
