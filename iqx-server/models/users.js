const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: {
      type: String,
      required: [true, "{PATH} is required"],
      match: [/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "{PATH} is required"],
      unique: true,
      lowercase: true
    },
    password: { type: String, required: [true, "{PATH} is required"] },
    is_verified: { type: Boolean, required: [true, "{PATH} is required"], default: false },
    otp_create: { type: Number },
    otp_forget: { type: Number }
  },
  {
    methods: {
      isPasswordValid: async function (password) {
        const result = await bcrypt.compare(password, this.password);
        return result;
      },
      createJwt: function () {
        return jwt.sign({ uur: this._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
          algorithm: "HS256"
        });
      },
      verifyCreateOtp: function (otp) {
        return Number(otp) === this.otp_create;
      },
      verifyforgetOtp: function (otp) {
        return Number(otp) === this.otp_forget;
      }
    },
    timestamps: true,
    versionKey: false
  }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("users", schema);
