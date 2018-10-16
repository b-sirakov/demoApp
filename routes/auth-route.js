const router = require("express").Router();
const passport = require("passport");

// auth login
router.get("/login", function(req, res, next) {
  console.log("Responding from '/auth/login'");
  res.render("login");
});

// auth logout
router.get("/logout", function(req, res, next) {
  req.logout();
  res.clearCookie("token");
  res.redirect("http://localhost:3000/");
});

// auth with Axway
router.get(
  "/axway",
  passport.authenticate("oauth2", {
    scope: ["axway_customer", "axway_employee"],
    session: false
  })
);

router.get("/axway/redirect", passport.authenticate("oauth2"), function(req,res) {
  res.cookie("token", req.user);
  res.redirect('http://localhost:3000/welcome')
});

module.exports = router;
