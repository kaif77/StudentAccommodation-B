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
  getUsersFromLogin,
  updateloginStatus,
  updateloginPassword,
  updateUserProfile,
} = require("../controllers/user.controller");
const { authUser, authRole } = require("../middleware/auth");

router.post("/", createUser);
router.get("/", authUser, authRole(["admin"]), getUsers);
router.get(
  "/get-login-users",
  authUser,
  authRole(["admin"]),
  getUsersFromLogin
);
router.get("/maxid", getMaxUserId);
router.get("/:id", authUser, authRole(["admin", "student"]), getUserByUniId);
router.patch("/", authUser, authRole(["admin", "student"]), updateUsers);
router.patch(
  "/update-profile",
  authUser,
  authRole(["admin"]),
  updateUserProfile
);
router.patch(
  "/update-status",
  authUser,
  authRole(["admin"]),
  updateloginStatus
);
router.patch(
  "/update-password",
  authUser,
  authRole(["admin"]),
  updateloginPassword
);
router.delete("/", authUser, authRole(["admin"]), deleteUser);

router.post("/login", login);

module.exports = router;

// ? authuser => need valid JWTtoken
// ! authRole(["admin"]) => only admin can access this route
