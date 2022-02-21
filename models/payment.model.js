const db = require("../conn/database");

module.exports = {
  getBookingforPayment: (id, callBack) => {
    db.query(
      `select rb.*,p.* from roombooking rb inner join payment p on p.uniID=rb.uniID where rb.totalyPaid='no' and rb.status = 'confirm' and p.paymentID = (SELECT MAX(paymentID) from payment where uniID=?) and rb.bookingID=p.bookingID`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getLastPaymentbyUniID: (data, callBack) => {
    db.query(
      `select * from payment where paymentID=(select max(paymentID) from payment where uniID = ? and bookingID = ?)`,
      [data.uniID, data.bookingID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getPaidPaymenybyUniID: (id, callBack) => {
    db.query(
      `select * from payment where uniID = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addPayment: (data, callBack) => {
    db.query(
      `insert into payment(bookingID, uniID, payAmount, dueAmount, date) values(?,?,?,?,?)`,
      [data.bookingID, data.uniID, data.payAmount, data.dueAmount, data.date],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
