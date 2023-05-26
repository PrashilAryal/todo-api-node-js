const bodyParser = require("body-parser");
const express = require("express");
const appConfig = require("./config/config");
const router = require("./routes/index.route");
const userRouter = require("./routes/user.route");
const app = express();
const getConnection = require("./config/db");
const todoRouter = require("./routes/todo.route");
const conn = getConnection();

//middleware
app.use((req, res, next) => {
  req.conn = conn;
  next();
});

//init
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router
app.use("/", router);
app.use("/users", userRouter);
app.use("/todo", todoRouter);

//server activation
app.listen(appConfig.PORT || 8000, () => {
  console.log("Server is running", appConfig.PORT);
});
