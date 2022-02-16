const express = require("express");
const router = express.Router();

const {
  checkRoomAvalability,
  addNewBlock,
  addNewRoom,
  updateRoomDeatils,
  updateBlockDeatils,
  deleteRoomDeatils,
  deleteBlockDeatils,
} = require("../controllers/room.controller");
const { authUser, authRole } = require("../middleware/auth");

router.get("/check-room", authUser, authRole(["admin", "student"]), checkRoomAvalability);
router.post("/add-new-block", authUser, authRole(["admin"]), addNewBlock);
router.post("/add-new-room", authUser, authRole(["admin"]), addNewRoom);
router.patch("/update-room", authUser, authRole(["admin"]), updateRoomDeatils);
router.patch(
  "/update-block",
  authUser,
  authRole(["admin"]),
  updateBlockDeatils
);
router.delete("/delete-room", authUser, authRole(["admin"]), deleteRoomDeatils);
router.delete(
  "/delete-block",
  authUser,
  authRole(["admin"]),
  deleteBlockDeatils
);

module.exports = router;
