function canUpdateUser(req) {
  return (
    req.decoded.result.role === "admin" ||
    req.decoded.result.userID === req.body.userID
  );
}

module.exports = {
  canUpdateUser,
};
