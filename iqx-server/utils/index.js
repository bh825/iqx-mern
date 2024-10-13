exports.transporter = require("nodemailer").createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "hiraparabh@gmail.com",
    pass: "myfg fgyp ywss gzzk"
  }
});
