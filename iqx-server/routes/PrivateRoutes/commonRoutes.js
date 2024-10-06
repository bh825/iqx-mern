const CommonRoutes = require("express").Router();

CommonRoutes.route("/common/data").get((req, res) => {
  res.send({ data: req.auth });
});

module.exports = CommonRoutes;
