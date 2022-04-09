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
      const userRole = req.decoded.result.role;
      const result = role
        .map((role) => role.includes(userRole))
        .find((val) => val === true);
      if (!result) {
        res.status(401);
        return res.send("Not Allowed");
      }
      next();
    };
  },
};
