const jwt = require("jsonwebtoken");

const decodeMiddleware = (req, res, next) => {
  //Get the user from the JWT authToken and add it to the object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ "Error Message": "Please authenicate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ "Error Message": "Please authenicate using a valid token" });
  }
};

exports.decoder = decodeMiddleware;
