const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.set("runValidators", true);

module.exports = mongoose.connect(process.env.NODE_ENV === "production" ? process.env.DB_URL_PRODUCTION : process.env.DB_URL);
