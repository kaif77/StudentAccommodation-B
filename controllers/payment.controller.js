const {
  getBookingforPayment,
  getAllPayment,
  getLastPaymentbyUniID,
  addPayment,
  updateTotalyPaid,
  getPaidPaymentbyUniID,
  getDuePaymentbyUniID,
} = require("../models/payment.model");

module.exports = {
  getPaymentByUniId: (req, res) => {
    const id = req.params.id;
    getBookingforPayment(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getAllPayments: (req, res) => {
    getAllPayment((err, results) => {
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

  getPaidPaymentByUniId: (req, res) => {
    const id = req.params.id;
    getPaidPaymentbyUniID(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getDuePaymentbyUniID: (req, res) => {
    const id = req.params.id;
    getDuePaymentbyUniID(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  addNewPaymet: (req, res) => {
    const body = req.body;
    getLastPaymentbyUniID(body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      if (result) {
        body.dueAmount = result.dueAmount - body.payAmount;
        body.date = new Date();
        addPayment(body, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection error",
            });
          }
          if (body.dueAmount <= 0) {
            updateTotalyPaid(body, (err, result) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: 0,
                  message: "Database connection error",
                });
              }
              return res.status(200).json({
                success: 1,
                data: result,
              });
            });
          } else {
            return res.status(200).json({
              success: 1,
              data: result,
            });
          }
        });
      }
    });
  },
};
