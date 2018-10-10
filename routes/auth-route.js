const router = require("express").Router();
const passport = require("passport");

//auth login
router.get("/login", function(req, res, next) {
  res.render("login");
});

//auth logout
router.get("/logout", function(req, res, next) {
  req.logout();
  res.clearCookie("token");
  res.redirect("/");
  res.send("logging out");
});

// auth with
router.get(
  "/axway",
  passport.authenticate("oauth2", {
    scope: ["axway_customer", "axway_employee"],
    session: false
  })
);

router.get("/axway/redirect", passport.authenticate("oauth2"), function(req,res) {

  res.cookie("token", req.user);
  res.redirect("/api/home",);
  // res.render("new-home",{token: req.user});
});

module.exports = router;
