const express = require("express");
const router = express.Router();

const {
  addNewBooking,
  getBooking,
  getbookingByUniId,
  updatebookingStatus,
  getAllBooking,
} = require("../controllers/booking.controller");
const { authUser, authRole } = require("../middleware/auth");

router.post("/", addNewBooking);
router.get("/", authUser, authRole(["admin"]), getBooking);
router.get("/get-all-booking", authUser, authRole(["admin"]), getAllBooking);
router.get("/:id", authUser, authRole(["admin", "student"]), getbookingByUniId);
router.patch(
  "/update-status",
  authUser,
  authRole(["admin", "student"]),
  updatebookingStatus
);

module.exports = router;
