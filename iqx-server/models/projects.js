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
        status: { type: String, required: [true, "{PATH} is required"] },
        domain: { type: String, required: [true, "{PATH} is required"] },
        framework: { type: String, required: [true, "{PATH} is required"] },
        control: { type: String, required: [true, "{PATH} is required"] },
        question: { type: String, required: [true, "{PATH} is required"] },
        marks: { type: String, enum: ["Partial Compliant", "Non Compliant", "Fully Compliant"] },
        risk: { type: String, enum: ["High", "Medium", "Low"] },
        review: { type: String },
        observation: { type: String }
      }
    ],
    history: [
      {
        status: { type: String, required: [true, "{PATH} is required"] },
        domain: { type: String, required: [true, "{PATH} is required"] },
        framework: { type: String, required: [true, "{PATH} is required"] },
        control: { type: String, required: [true, "{PATH} is required"] },
        question: { type: String, required: [true, "{PATH} is required"] },
        marks: { type: String, enum: ["Partial Compliant", "Non Compliant", "Fully Compliant"] },
        risk: { type: String, enum: ["High", "Medium", "Low"] },
        time: { type: Date, required: [true, "{PATH} is required"] },
        review: { type: String },
        observation: { type: String }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("projects", schema);
