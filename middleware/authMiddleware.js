const jwt = require("jsonwebtoken");

const reqAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  // check json web token exists & verif
  if (token) {
    jwt.verify(token, "fajri secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { reqAuth };
