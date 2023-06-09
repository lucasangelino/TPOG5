const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

exports.decodeUserFromToken = async function decodeUserFromToken(
  req,
  res,
  next
) {
  let token = req.get("Authorization") || req.query.token || req.body.token;
  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        next(err);
      } else {
        req.idUsuario = decoded.uid;
        next();
      }
    });
  } else {
    next();
  }
};

exports.checkAuth = async function checkAuth(req, res, next) {
  return req.user ? next() : res.status(401).json({ msg: "Not Authorized" });
};
