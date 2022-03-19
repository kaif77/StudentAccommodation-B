const db = require("../conn/database");

module.exports = {
  getBookingforPayment: (id, callBack) => {
    db.query(
      `select r.*,p.dueAmount from roombooking r inner join payment p on p.bookingID=r.bookingID where totalyPaid='no' and r.status='confirm'  and r.uniID=? and p.paymentID=(select max(paymentID) from payment where uniID=r.uniID and bookingID=r.bookingID)`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAllPayment: (callBack) => {
    db.query(
      `select * from payment`,
      [],
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

  getPaidPaymentbyUniID: (id, callBack) => {
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

  getDuePaymentbyUniID: (id, callBack) => {
    db.query(
      `select r.*,p.dueAmount,(SELECT DATEDIFF((now()), r.startDate)) as DateDiff from roombooking r inner join payment p on p.bookingID=r.bookingID where totalyPaid='no'  and r.uniID=? and p.paymentID=(select max(paymentID) from payment where uniID=r.uniID and bookingID=r.bookingID)`,
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
  updateTotalyPaid: (data, callBack) => {
    db.query(
      `update roombooking set totalyPaid='yes' where bookingID = ?`,
      [data.bookingID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
