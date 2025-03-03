const express = require("express");

const app = express();

app.use(express.static("public"));

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// imports locals module onto my server
const indexRouter = require("./routes/indexRouter");
const pokemonsRouter = require("./routes/pokemonsRouter");
const trainersRouter = require("./routes/trainersRouter");
const typesRouter = require("./routes/typesRouter");

// defines / route and registers indexRouter middleware
app.use("/", indexRouter);
// defines / route and registers pokemonsRouter middleware
app.use("/", pokemonsRouter);
// defines / route and registers trainersRouter middleware
app.use("/", trainersRouter);
// defines / route and registers typesRouter middleware
app.use("/", typesRouter);

// tells my server to listen for incoming requests on port 3000
// Use dynamic port for deployment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
