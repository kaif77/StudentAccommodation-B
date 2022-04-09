const express = require("express");
const router = express.Router();

const {
  getPaymentByUniId,
  getAllPayments,
  addNewPaymet,
  getPaidPaymentByUniId,
  getDuePaymentbyUniID,
} = require("../controllers/payment.controller");
const { authUser, authRole } = require("../middleware/auth");
router.get("/get-all", authUser, authRole(["admin"]), getAllPayments);
router.get("/payment/:id", authUser, authRole(["admin"]), getPaymentByUniId);
router.get(
  "/paid/:id",
  authUser,
  authRole(["admin", "student"]),
  getPaidPaymentByUniId
);
router.get(
  "/due/:id",
  authUser,
  authRole(["admin", "student"]),
  getDuePaymentbyUniID
);
router.post("/", authUser, authRole(["admin"]), addNewPaymet);

module.exports = router;
