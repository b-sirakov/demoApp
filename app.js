const express = require("express");
const authRouter = require("./routes/auth-route.js");
const apiRouter = require("./routes/api-route.js");
const passportSetup = require("./config/passport-setup.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

const app = express();

//set up view engine

app.use(express.static("assets"));

app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//apply routes to app
app.use("/auth", authRouter);

//applying api routes
app.use("/api", apiRouter);

//create home routes

app.get("/", function(req, res, next) {
  res.render("home");
});

app.listen(3000, function() {
  console.log("now listening on port 3000");
});
