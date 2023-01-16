const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;

    console.log("verified", verified);
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
}

// if you need multiple export then use module.exports = { auth };

module.exports = auth;
