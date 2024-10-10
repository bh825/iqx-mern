const projects = require("../../models/projects");

const AddReview = require("express").Router();

AddReview.route("/add-review").post(async (req, res, next) => {
  try {
    if (["status", "domain", "framework", "control", "question", "marks", "project_id"].every((a) => req.body?.[a])) {
      throw { message: "This is not a valid request", status: 400 };
    }
    const project = await projects.findById(req.body?.project_id);
    if (!project?._id) {
      throw { message: "This is not a valid request", status: 400 };
    }
    const available = project?.clauses_data?.findIndex((a) =>
      ["status", "domain", "framework", "control", "question"].every((b) => a?.[b] === req.body?.[b])
    );
    console.log(available);
    if (!available || available < 0) {
      project.clauses_data?.push(
        ["status", "domain", "framework", "control", "question", "marks"].reduce((acc, cv) => {
          acc[cv] = req.body?.[cv];
          return acc;
        }, {})
      );
      await project.validate();
      await project.save();
      return res.send({ message: "Marks added successfully." });
    } else {
      project.clauses_data[available].marks = req.body?.marks;
      await project.validate();
      await project.save();
      return res.send({ message: "Marks added successfully." });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = AddReview;
