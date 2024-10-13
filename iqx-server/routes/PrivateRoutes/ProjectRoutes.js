const projects = require("../../models/projects");

const ProjectRoutes = require("express").Router();

ProjectRoutes.route("/projects")
  .get(async (req, res, next) => {
    try {
      if (!req?.auth?._id) {
        throw { status: 401, message: "You are not allowed to make Request" };
      }
      const project = await projects.find({ createdBy: req?.auth });
      return res.send({ data: project });
    } catch (error) {
      return next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      if (!req?.auth?._id) {
        throw { status: 401, message: "You are not allowed to make Request" };
      }
      const project = await projects.create({ ...req.body, createdBy: req.auth._id });
      return res.send({ data: project, message: "Your Project is created." });
    } catch (error) {
      return next(error);
    }
  });

ProjectRoutes.route("/projects/:id").get(async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw { status: 400, message: "This is not valid project. Go Back and select a project." };
    }
    const project = await projects.findById(req.params.id).select("-history");
    return res.send({ data: project });
  } catch (error) {
    return next(error);
  }
});

module.exports = ProjectRoutes;
