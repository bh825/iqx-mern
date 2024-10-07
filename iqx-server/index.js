require("dotenv").config();
const express = require("express");
const db = require("./utils/db");
const cors = require("cors");
const PublicMiddleware = require("./utils/PublicMiddleware");
const path = require("path");
const MainRouter = require("./routes");
const compression = require("compression");
const convertXlsx = require("./utils/convertXlsx");
const schema = require("./utils/schema");
const { ZodError } = require("zod");
const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", PublicMiddleware, MainRouter);
app.use("/api/*", (req, res) => {
  res.status(400).send({ message: "No route match" });
});

app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === "JsonWebTokenError") {
    return res.status(401).send(err);
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).send(err);
  }
  if (err.name === "NotBeforeError") {
    return res.status(401).send(err);
  }
  if (err.name === "ValidationError") {
    const error = Object.keys(err.errors).reduce((acc, cv) => ({ ...acc, [cv]: err.errors[cv].message }), {});
    return res.status(403).send({ ...error, message: Object.values(error).join(", ") });
  }
  if (err.name === "CastError") {
    return res.status(403).send({ message: err?.message });
  }
  if (err.code === 11000) {
    return res.status(403).send({ message: `${Object.keys(err.keyPattern)[0]} already taken` });
  }
  if (err.status) {
    return res.status(err.status).send(err);
  }
  console.log(err);
  return res.status(500).send(err);
});

db.then((a) => {
  schema.parse(convertXlsx);
  app.listen(process.env.PORT, () => {
    console.log(
      `server is running on ${process.env.PORT} in ${process.env.NODE_ENV} and DB:${a.connections.map((b) => b.name).join(", ")}`
    );
  });
}).catch((e) => {
  if (e instanceof ZodError) {
    e?.errors.forEach((a) => console.log(`Error Occured: on line ${a.path[0] + 1} and column ${a.path[1]}`));
    console.log("file validation failed");
    return process.exit(1);
  }
  process.exit(1);
});
