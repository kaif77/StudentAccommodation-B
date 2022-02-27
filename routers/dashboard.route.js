const express = require("express");
const router = express.Router();

const {
  getBookingRequestCount,
  getRoomBookingCount,
  getFreeRoomCount,
} = require("../controllers/dashboard.controller");
const { authUser, authRole } = require("../middleware/auth");

router.get(
  "/booking-count-today",
  //   authUser,
  //   authRole(["admin"]),
  getRoomBookingCount
);
router.get(
  "/booking-request-count",
  //   authUser,
  //   authRole(["admin"]),
  getBookingRequestCount
);
router.get(
  "/abailable-room-count",
  //   authUser,
  //   authRole(["admin"]),
  getFreeRoomCount
);

module.exports = router;
