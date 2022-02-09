const db = require("../conn/database");

module.exports = {
  create: (data, callBack) => {
    db.query(
      `insert into user(userID, uniID, firstName, lastName, address, email, telno, gender, role, profile) values(?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.userID,
        data.uniID,
        data.firstName,
        data.lastName,
        data.address,
        data.email,
        data.telno,
        data.gender,
        data.role,
        data.profile,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  insertlogin: (data, callBack) => {
    db.query(
      `insert into login(username, password, role, status, userID) values(?,?,?,?,?)`,
      [data.uniID, data.password, data.role, data.status, data.userID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    db.query(`select * from user`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },
  getUserByUniId: (id, callBack) => {
    db.query(
      `select * from user where uniID = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    db.query(
      `update user set firstName=?, lastName=?, address=?, email=?, telno=? where uniId = ?`,
      [
        data.firstName,
        data.lastName,
        data.address,
        data.email,
        data.telno,
        data.uniID,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    db.query(
      `delete from user where  userID= ?`,
      [data.userID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },


  //this only for login
  getUserByUsername: (username, callBack) => {
    db.query(
      `select * from login where username = ?`,
      [username],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
