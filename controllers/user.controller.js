const { create } = require("../models/user.model");

exports.createuser = (req, res) => {
  const body = req.body;
  create(body, (err, result) => {
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
};
