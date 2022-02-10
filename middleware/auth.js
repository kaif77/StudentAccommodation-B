const jwt = require("jsonwebtoken");

module.exports = {
  authUser: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token...",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User",
      });
    }
  },

  authRole: (role) => {
    return (req, res, next) => {
      let valid = false;
      role.forEach((element) => {
        if (element === req.decoded.result.role) {
          valid = true;
        }
      });
      if (!valid) {
        res.status(401);
        return res.send("Not Allowed");
      }
      next();
    };
  },
};
