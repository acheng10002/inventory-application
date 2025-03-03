const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Pokemon Management System " });
});

module.exports = indexRouter;
