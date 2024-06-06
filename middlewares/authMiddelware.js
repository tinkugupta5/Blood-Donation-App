const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    const parts = authHeader.split(" ");
    
    if (parts.length !== 2) {
      return res.status(401).send({
        success: false,
        message: "Invalid authorization header format",
      });
    }

    const token = parts[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).send({
      success: false,
      error: error.message,
      message: "Auth Failed",
    });
  }
};
