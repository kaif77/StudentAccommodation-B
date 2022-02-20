const {
  checkAvalability,
  addBlock,
  addRoom,
  getBlockByGender,
  updateBlock,
  updateRoom,
  deleteBlock,
  deleteRoom,
  getRoom,
  getBlock,
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

  getRooms: (req, res) => {
    getRoom((err, results) => {
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

  getBlocks: (req, res) => {
    getBlock((err, results) => {
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

  getBlockByGenderType: (req, res) => {
    const genderType = req.params.genderType;
    getBlockByGender(genderType, (err, results) => {
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
