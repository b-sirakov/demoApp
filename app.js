const express = require("express");
const authRouter = require("./routes/auth-route.js");
const apiRouter = require("./routes/api-route.js");
const passportSetup = require("./config/passport-setup.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const path = require("path");
const cors = require("cors");

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

const app = express();

app.set("view engine", "ejs");

app.use(cors(corsOptions));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// apply routes to app
app.use("/auth", authRouter);

// apply api routes
app.use("/api", apiRouter);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'react-client/my-app/build')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/react-client/my-app/build/index.html'));
})

app.listen(3001, function() {
  console.log("Now listening on port 3001");
});