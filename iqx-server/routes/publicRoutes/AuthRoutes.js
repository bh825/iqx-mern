const users = require("../../models/users");
const { transporter, sender } = require("../../utils");

const AuthRoutes = require("express").Router();

function generateRandomFourDigit() {
  return Math.floor(1000 + Math.random() * 9000);
}

AuthRoutes.route("/login").post((req, res, next) => {
  users
    .findOne({ email: req?.body?.email })
    .then(async (data) => {
      if (!data) {
        return next({
          status: 403,
          name: "user error",
          message: req?.body?.email ? "You are not signed up with us. Please, Sign up." : "Please, enter email!"
        });
      }
      if (data?.is_verified && (await data.isPasswordValid(req.body.password))) {
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
    if (!req.body?.email || !req.body?.password) {
      throw { sattus: 400, message: "Please, add email and password." };
    }
    const available = await users.findOne({ email: req.body?.email });
    if (available && available.is_verified) {
      throw { status: 400, message: "You are already have an account with us. Please, consider sign-in." };
    }
    let user;
    if (available) {
      user = await users.findOneAndUpdate(
        { email: req.body?.email },
        { ...req.body, otp_create: generateRandomFourDigit() },
        { new: true }
      );
    } else {
      user = await users.create({ ...req.body, otp_create: generateRandomFourDigit() });
    }
    await transporter.sendMail({
      from: sender,
      to: user.email,
      html: `<p>Thank you for sign-up.</p><p>Your otp is <b>${user.otp_create}</b></p>`,
      subject: "Verify your account with IQX"
    });
    return res.send({ message: "You are signed-up successfully. and send a otp to your mobile no." });
  } catch (error) {
    return next(error);
  }
});

AuthRoutes.post("/verify", async (req, res, next) => {
  try {
    if (!req.body?.email || !req.body?.otp || !req.body?.verify) {
      throw { status: 400, message: "This is not a valid request." };
    }
    const user = await users.findOne({ email: req.body?.email });
    if (!user) {
      throw { status: 400, message: "This is not a valid request." };
    }
    if (req.body?.verify === "create" && user.verifyCreateOtp(req.body?.otp)) {
      user.is_verified = true;
      await user.save();
      return res.send({ message: "You are verified with IQX. Please, sign in for using IQX." });
    }
    if (req.body?.verify === "forget" && user.verifyforgetOtp(req.body?.otp)) {
      user.password = req.body?.password;
      await user.save();
      return res.send({ message: "You password is updated. Please, sign-in" });
    }
    throw { status: 400, message: "This is not a valid request" };
  } catch (error) {
    return next(error);
  }
});

AuthRoutes.post("/forget-password", async (req, res, next) => {
  try {
    const user = await users.findOne({ email: req.body?.email });
    if (!user) {
      throw { status: 400, message: "This e-mail is not sign-up with us" };
    }
    user.otp_forget = generateRandomFourDigit();
    await user.save();
    await transporter.sendMail({
      from: sender,
      to: user.email,
      html: `<p>Thank you for sign-up.</p><p>Your otp is <b>${user.otp_forget}</b></p>`,
      subject: "Verify your account with IQX"
    });
    return res.send({ message: "We have Sent an OTP. to your mail id" });
  } catch (error) {
    next(error);
  }
});

module.exports = AuthRoutes;
