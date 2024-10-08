const ClausesRoutes = require("express").Router();
const convertXlsx = require("../../utils/convertXlsx");

ClausesRoutes.route("/clauses").get((req, res) => {
  res.send({ data: convertXlsx });
});

module.exports = ClausesRoutes;
