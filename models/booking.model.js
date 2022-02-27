const db = require("../conn/database");

module.exports = {
  addBooking: (data, callBack) => {
    db.query(
      `insert into roombooking(roomID, startDate, endDate, payment, totalyPaid, status, uniID) values(?,?,?,?,?,?,?)`,
      [
        data.roomId,
        data.startDate,
        data.endDate,
        data.payment,
        data.totalyPaid,
        data.status,
        data.uniID,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getBooking: (callBack) => {
    db.query(
      `SELECT b.bookingID,r.blockID, b.uniID, b.startDate,b.endDate, b.payment, r.roomNo FROM roombooking b INNER JOIN room r ON b.roomID=r.roomID WHERE b.status = 'pending'`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAllBooking: (callBack) => {
    db.query(
      `SELECT b.bookingID, b.uniID,r.roomID,r.blockID, b.startDate,b.endDate, b.payment, r.roomNo FROM roombooking b INNER JOIN room r ON b.roomID=r.roomID`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getBookingByuniId: (id, callBack) => {
    db.query(
      `select rb.*,b.blockName,r.roomNo from roombooking rb inner join room r on r.roomID = rb.roomID INNER join block b ON b.blockID = r.blockID where uniID=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getLastBookingByUser: (data, callBack) => {
    db.query(
      `select count(*) as count from roombooking where ?<(select max(endDate) from roombooking where uniID=?)`,
      [data.startDate, data.uniID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updatebookingStatus: (data, callBack) => {
    db.query(
      `update roombooking set status=? where bookingID = ?`,
      [data.status, data.bookingID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
