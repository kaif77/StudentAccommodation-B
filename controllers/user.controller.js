const {
  create,
  insertlogin,
  getUsers,
  getUserByUniId,
  updateUser,
  updateLoginUser,
  getUserByUsername,
  getMaxUserId,
} = require("../models/user.model");
const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    body.status = body.role === "admin" ? "inactive" : "active";
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    getUserByUniId(body.uniID, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results) {
        res.status(500);
        return res.send("UniID Already Used");
      } else {
        create(body, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection error",
            });
          }
        });
        insertlogin(body, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection error in login",
            });
          }
          return res.status(200).json({
            success: 1,
            data: result,
          });
        });
      }
    });
  },
  getUserByUniId: (req, res) => {
    const id = req.params.id;
    getUserByUniId(id, (err, results) => {
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
  getUsers: (req, res) => {
    getUsers((err, results) => {
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
  updateUsers: (req, res) => {
    const body = req.body;
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  updateloginUsers: (req, res) => {
    const body = req.body;
    updateLoginUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
  getMaxUserId: (req, res) => {
    getMaxUserId((err, results) => {
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
  login: (req, res) => {
    const body = req.body;
    getUserByUsername(body.username, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "invalid username or password",
        });
      }

      const result = compareSync(body.password, results.password);
      if (result && results.status === "active") {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWTKEY, {
          expiresIn: "5h",
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          role: results.role,
        });
      } else {
        if (results.status !== "active") {
          return res.json({
            success: 0,
            message: "Your Account is inactive",
          });
        }
        return res.json({
          success: 0,
          message: "invalid username or password",
        });
      }
    });
  },
};
