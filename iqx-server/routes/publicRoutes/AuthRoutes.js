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
      if (await data.isPasswordValid(req.body.password)) {
        return res.send({
          status: true,
          message: "You are loggged in. Now, You access all your projects.",
          tk: data?.createJwt()
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
