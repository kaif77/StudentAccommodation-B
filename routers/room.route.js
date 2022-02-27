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
  getBlockByGenderType,
  getRooms,
  getBlocks,
} = require("../controllers/room.controller");
const { authUser, authRole } = require("../middleware/auth");

router.post(
  "/check-room",
  authUser,
  authRole(["admin", "student"]),
  checkRoomAvalability
);
router.post("/add-new-block", authUser, authRole(["admin"]), addNewBlock);
router.post("/add-new-room", authUser, authRole(["admin"]), addNewRoom);
router.get("/get-room", authUser, authRole(["admin"]), getRooms);
router.get("/get-block", authUser, authRole(["admin"]), getBlocks);
router.get(
  "/:genderType",
  authUser,
  authRole(["admin", "student"]),
  getBlockByGenderType
);
router.patch("/update-room", authUser, authRole(["admin"]), updateRoomDeatils);
router.patch(
  "/update-block",
  authUser,
  authRole(["admin"]),
  updateBlockDeatils
);
router.delete(
  "/delete-room/:id",
  authUser,
  authRole(["admin"]),
  deleteRoomDeatils
);
router.delete(
  "/delete-block/:id",
  authUser,
  authRole(["admin"]),
  deleteBlockDeatils
);

module.exports = router;
