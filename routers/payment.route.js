const express = require("express");
const router = express.Router();

const {
  getPaymentByUniId,
  addNewPaymet,
  getPaidPaymentByUniId,
} = require("../controllers/payment.controller");
const { authUser, authRole } = require("../middleware/auth");

router.get("/payment/:id", getPaymentByUniId);
router.get("/paid/:id", getPaidPaymentByUniId);
router.post("/", addNewPaymet);

module.exports = router;
