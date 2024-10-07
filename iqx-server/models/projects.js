const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "{PATH} is required"],
      minLength: [3, "Project name have atleast 3 character"]
    },
    is_started: {
      type: Boolean,
      required: [true, "{PATH} is required"],
      default: false
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "{PATH} is required"]
    },
    clauses_data: [
      {
        s: { type: String, required: [true, "{PATH} is required"] },
        d: { type: String, required: [true, "{PATH} is required"] },
        f: { type: String, required: [true, "{PATH} is required"] },
        c: { type: String, required: [true, "{PATH} is required"] },
        q: { type: String, required: [true, "{PATH} is required"] },
        marks: { type: Number, min: [0, "Marks is not less than 0"], default: 0 }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("projects", schema);
