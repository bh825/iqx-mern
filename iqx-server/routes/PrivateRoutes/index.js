const PrivateRoutes = require("express").Router();
const jwt = require("jsonwebtoken");
const users = require("../../models/users");

PrivateRoutes.use((req, res, next) => {
  jwt.verify(req?.headers?.authorization?.split(" ")[1], process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return next(err);
    } else {
      users
        .findById(decoded.uur)
        .then((data) => {
          if (!data) {
            return next({
              status: 401,
              name: "user error",
              message: "User is not available"
            });
          }
          req.auth = data;
          next();
        })
        .catch(next);
    }
  });
});

module.exports = PrivateRoutes;
