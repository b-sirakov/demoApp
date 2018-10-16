const router = require("express").Router();
const passport = require("passport");
const request = require("request");
const path = require("path");

//auth login
router.get("/login", function(req, res, next) {
  res.render("login");
});

//auth logout
router.get("/logout", function(req, res, next) {
      req.logout();
      res.clearCookie("token");
      res.clearCookie("session");
      res.redirect("https://login-dev.axway.com/auth/realms/Axway/protocol/openid-connect/logout?redirect_uri=http://localhost:3001/");
});

// auth with  
router.get(
  "/axway",
  passport.authenticate("oauth2", {
    scope: ["axway_customer", "axway_employee"],
    // session: false
  })
);

router.get("/axway/redirect", passport.authenticate("oauth2"), function(req,res) {
  console.log();
  res.cookie("token", req.user);
  res.set("isRedirect","true");
  res.redirect("/welcome?isRedirected=true");
});

module.exports = router;
