const { checkAvalability } = require("../models/room.model");

exports.checkRoomAvalability = (req, res) => {
  const data = req.body;
  console.log(data.startDate);
  checkAvalability(data, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Not Room Avalable",
      });
    }
    return res.json({
      success: 1,
      data: results,
    });
  });
};
