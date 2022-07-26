const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const { reqAuth, checkUser } = require("./middleware/authMiddleware");
import "dotenv/config";
const app = express();
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
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", reqAuth, (req, res) => res.render("home"));
app.get("/smoothies", reqAuth, (req, res) => res.render("smoothies"));
app.use(authRouter);

// // cookies
// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-Cookie", "newUser=true");
//   res.cookie("newUser", false);
//   res.cookie("newUserTwo", true, {
//     maxAge: 1000 * 60 * 60 * 24,
//     httpOnly: true,
//   });

//   res.send("you got cookies");
// });

// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies.newUser);
//   res.json(cookies);
// });
