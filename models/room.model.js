const db = require("../conn/database");

module.exports = {
  create: (data, callBack) => {
    db.query(
      `insert into user(userID, uniID, firstName, lastName, address, email, gender, role, status, verified) values(?,?,?,?,?,?,?,?,?,?)`,
      [
        data.userID,
        data.uniID,
        data.firstName,
        data.lastName,
        data.address,
        data.email,
        data.gender,
        data.role,
        data.status,
        data.verified,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  checkAvalability: (data, callBack) => {
    db.query(
      `SELECT roomNo FROM room WHERE room.roomID NOT IN (SELECT r.roomid FROM roombooking b INNER JOIN room r ON b.roomID = r.roomID WHERE (b.startDate<=? AND b.endDate>?) OR (b.startDate>? AND b.endDate<=?)) AND blockID=?`,
      [
        data.startDate,
        data.endDate,
        data.startDate,
        data.endDate,
        data.blockID,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
