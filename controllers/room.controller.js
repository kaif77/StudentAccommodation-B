const {
  checkAvalability,
  addBlock,
  addRoom,
  updateBlock,
  updateRoom,
  deleteBlock,
  deleteRoom,
} = require("../models/room.model");

module.exports = {
  addNewBlock: (req, res) => {
    const body = req.body;
    addBlock(body, (err, result) => {
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
  },
  addNewRoom: (req, res) => {
    const body = req.body;
    addRoom(body, (err, result) => {
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
  },
  updateBlockDeatils: (req, res) => {
    const body = req.body;
    updateBlock(body, (err, results) => {
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
  updateRoomDeatils: (req, res) => {
    const body = req.body;
    updateRoom(body, (err, results) => {
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

  deleteRoomDeatils: (req, res) => {
    const data = req.body;
    deleteRoom(data, (err, results) => {
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

  deleteBlockDeatils: (req, res) => {
    const data = req.body;
    deleteBlock(data, (err, results) => {
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

  checkRoomAvalability: (req, res) => {
    const data = req.body;
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
  },
};
