const db = require("../conn/database");

module.exports = {
  getRoomBookingCount: (callBack) => {
    db.query(
      `select COUNT(*) as count from roombooking where startDate<=now() and endDate>=now()`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getBookingRequestCount: (callBack) => {
    db.query(
      `select COUNT(*) as count from roombooking where status='pending'`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getFreeRoomCount: (callBack) => {
    db.query(
      `SELECT COUNT(*) as count FROM room inner join block on block.blockID=room.blockID WHERE room.roomID NOT IN (SELECT r.roomid FROM roombooking b INNER JOIN room r ON b.roomID = r.roomID WHERE (b.startDate<=now() AND b.endDate>now()) OR (b.startDate<now() AND b.endDate>=now()))`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
