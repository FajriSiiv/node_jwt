const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const { reqAuth, checkUser } = require("./middleware/authMiddleware");
const app = express();

const PORT = process.env.PORT || 3000;
require("dotenv").config();
// middleware
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(express.static("public"));
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.KEY_API;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", reqAuth, (req, res) => res.render("home"));
app.get("/smoothies", reqAuth, (req, res) => res.render("smoothies"));
app.use(authRouter);
