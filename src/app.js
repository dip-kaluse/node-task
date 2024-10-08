const express = require("express");
const routes = require("./routes");

const {
  notFoundHandler,
  globalErrorHandler,
} = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

app.use("/api", routes);
app.use(notFoundHandler);
app.use(globalErrorHandler);
module.exports = app;
