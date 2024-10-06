const moment = require("moment");
const users = require("../../models/users");

const AuthRoutes = require("express").Router();

AuthRoutes.route("/login").post((req, res, next) => {
  users
    .findOne({ email: req?.body?.email })
    .then(async (data) => {
      if (!data) {
        return next({
          status: 403,
          name: "user error",
          message: req?.body?.email ? "User is not available" : "Please, enter email!"
        });
      }
      if (
        (await data.isPasswordValid(req.body.password)) &&
        (data?.resignation_date ? moment().isSameOrBefore(data?.resignation_date) : true)
      ) {
        return res.send({
          status: true,
          message: "login successfully",
          tk: data?.createJwt(),
          data: data
        });
      } else {
        next({
          status: 403,
          message: "username or password is not valid"
        });
      }
    })
    .catch(next);
});

AuthRoutes.post("/sign-up", async (req, res, next) => {
  try {
    await users.create(req.body);
    return res.send({ message: "You are signed-up successfully." });
  } catch (error) {
    return next(error);
  }
});

module.exports = AuthRoutes;
