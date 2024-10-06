module.exports = (req, res, next) => {
  if (req?.headers?.s === process.env.SEC) {
    next();
  } else {
    next({ status: 400, massege: "Bad Request" });
  }
};
