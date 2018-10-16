const router = require("express").Router();
const passport = require("passport");
const request = require("request");
const path = require("path");

// auth login
router.get("/login", function(req, res, next) {
  console.log("Responding from '/auth/login'");
  res.render("login");
});

// auth logout
router.get("/logout", function(req, res, next) {
<<<<<<< HEAD
      req.logout();
      res.clearCookie("token");
      res.clearCookie("session");
      res.redirect("https://login-dev.axway.com/auth/realms/Axway/protocol/openid-connect/logout?redirect_uri=http://localhost:3001/");
});

// auth with  
=======
  req.logout();
  res.clearCookie("token");
  res.redirect("http://localhost:3000/");
});

// auth with Axway
>>>>>>> 9a7433a4fce6794ec4468887d22dc9716cd9488d
router.get(
  "/axway",
  passport.authenticate("oauth2", {
    scope: ["axway_customer", "axway_employee"],
    // session: false
  })
);

router.get("/axway/redirect", passport.authenticate("oauth2"), function(req,res) {
<<<<<<< HEAD
  console.log();
  res.cookie("token", req.user);
  res.set("isRedirect","true");
  res.redirect("/welcome?isRedirected=true");
=======
  res.cookie("token", req.user);
  res.redirect('http://localhost:3000/welcome')
>>>>>>> 9a7433a4fce6794ec4468887d22dc9716cd9488d
});

module.exports = router;
