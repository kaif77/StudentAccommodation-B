const {
  getRoomBookingCount,
  getBookingRequestCount,
  getFreeRoomCount,
} = require("../models/dashboard.model");

module.exports = {
  getRoomBookingCount: (req, res) => {
    getRoomBookingCount((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getBookingRequestCount: (req, res) => {
    getBookingRequestCount((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getFreeRoomCount: (req, res) => {
    getFreeRoomCount((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
};
