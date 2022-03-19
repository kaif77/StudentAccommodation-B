const db = require("../conn/database");

module.exports = {
  create: (data, callBack) => {
    db.query(
      `insert into user(userID, uniID, firstName, lastName, address, email, telno, gender, role, profile) values(?,?,?,?,?,?,?,?,?,?)`,
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

  getUsersFromLogin: (callBack) => {
    db.query(`select * from login`, [], (error, results, fields) => {
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
      `update user set firstName=?, lastName=?, address=?, email=?, telno=? where uniID = ?`,
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

  updateUserProfile: (data, callBack) => {
    db.query(
      `update user set profile = ? where uniID = ?`,
      [data.profile, data.uniID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateLoginStatus: (data, callBack) => {
    db.query(
      `update login set status=? where userID = ?`,
      [data.status, data.userID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateLoginPassword: (data, callBack) => {
    db.query(
      `update login set password=? where userID = ?`,
      [data.password, data.userID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (id, callBack) => {
    db.query(
      `delete from user where userID= ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getMaxUserId: (callBack) => {
    db.query(
      `select * from user ORDER BY userID DESC LIMIT 1`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0].userID);
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
