const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  const white_list = ["/", "/register", "/login"];
  if (white_list.find((item) => "/v1/api" + item === req.originalUrl)) {
    next();
  } else {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      //verify token
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        return res
          .status(401)
          .json({ message: "Please login to continues !!!" });
      }
    } else {
      return res
        .status(401)
        .json({ message: " Please login to continues !!!" });
    }
  }
};

module.exports = {
  checkToken,
};
