exports.sender = "hiraparabh@gmail.com";
exports.pass = "myfg fgyp ywss gzzk";

exports.transporter = require("nodemailer").createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: this.sender,
    pass: this.pass
  }
});
