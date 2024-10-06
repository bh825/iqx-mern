const AuthRoutes = require("./publicRoutes/AuthRoutes");
const PrivateRoutes = require("./PrivateRoutes");

const MainRouter = require("express").Router();

MainRouter.use(AuthRoutes);
MainRouter.use(PrivateRoutes);

module.exports = MainRouter;
