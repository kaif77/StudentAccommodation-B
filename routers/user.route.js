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
const { authUser, authRole, authPermission } = require("../middleware/auth");

router.post("/", createUser);
router.get("/", authUser, authRole("admin"), getUsers);
router.get("/:id", authUser, getUserByUniId);
router.patch("/", authUser, authPermission, updateUsers);
router.delete("/", authUser, deleteUser);

router.post("/login", login);

module.exports = router;

// ?authuser => need valid JWTtoken
// !authRole("admin") => only admin can access this route
// !authPermission => only admin or uerID owner can access this route
