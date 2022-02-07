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
};
