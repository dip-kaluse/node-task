const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, "supppppeeeeeerrrrrr", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // Attach user information to the request object
    req.user = decoded;

    next();
  });
};

module.exports = authMiddleware;
