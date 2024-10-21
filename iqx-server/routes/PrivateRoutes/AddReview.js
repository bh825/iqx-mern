const projects = require("../../models/projects");

const AddReview = require("express").Router();

AddReview.route("/add-review")
  .post(async (req, res, next) => {
    try {
      if (
        !["status", "domain", "framework", "control", "question", "project_id"].every((a) => req.body?.[a]) ||
        !["marks", "risk", "observation", "review"].some((a) => req.body?.[a])
      ) {
        throw { message: "This is not a valid request", status: 400 };
      }
      const project = await projects.findById(req.body?.project_id);
      if (!project?._id) {
        throw { message: "This is not a valid request", status: 400 };
      }
      const available = project?.clauses_data?.findIndex((a) =>
        ["status", "domain", "framework", "control", "question"].every((b) => a?.[b] === req.body?.[b])
      );
      if (available < 0) {
        project.clauses_data?.push(
          ["status", "domain", "framework", "control", "question", "marks", "risk", "review", "observation"].reduce((acc, cv) => {
            if (req.body?.[cv]) acc[cv] = req.body?.[cv];
            return acc;
          }, {})
        );
        await project.validate();
        await project.save();
        return res.send({ message: "Marks added successfully." });
      } else {
        const history = { ...project.clauses_data[available].toJSON(), time: new Date() };

        if (
          history?._id &&
          ((req.body?.marks && history?.marks !== req.body?.marks) || (req.body?.risk && history?.risk !== req.body?.risk))
        ) {
          delete history?._id;
          project.history.push(history);
        }
        if (req.body?.marks) {
          project.clauses_data[available].marks = req.body?.marks;
        }
        if (req.body?.risk) {
          project.clauses_data[available].risk = req.body?.risk;
        }
        if (req.body?.review) {
          project.clauses_data[available].review = req.body?.review;
        }
        if (req.body?.observation) {
          project.clauses_data[available].observation = req.body?.observation;
        }

        await project.validate();
        await project.save();
        await project.save();
        return res.send({ message: "Marks added successfully." });
      }
    } catch (error) {
      return next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      if (!["status", "domain", "framework", "control", "question", "marks", "project_id", "_id"].every((a) => req.body?.[a])) {
        throw { message: "This is not a valid request", status: 400 };
      }
      await projects.findByIdAndUpdate(req.body?.project_id, {
        $pull: { clauses_data: { _id: req.body?._id } },
        $addToSet: { history: { ...req.body, time: new Date() } }
      });
      return res.send({ message: "review deleted successfully." });
    } catch (error) {
      return next(error);
    }
  });

module.exports = AddReview;
