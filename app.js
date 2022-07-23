const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const { cookie } = require("express/lib/response");

const app = express();

// middleware
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(express.static("public"));
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb://siiv-mong:test1234567890@nodemong-shard-00-00.2pyye.mongodb.net:27017,nodemong-shard-00-01.2pyye.mongodb.net:27017,nodemong-shard-00-02.2pyye.mongodb.net:27017/node-mong?ssl=true&replicaSet=atlas-fpc8sh-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRouter);

// cookies
app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "newUser=true");
  res.cookie("newUser", false);
  res.cookie("newUserTwo", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  res.send("you got cookies");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});
