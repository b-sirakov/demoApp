const express = require("express");
const authRouter = require("./routes/auth-route.js");
const apiRouter = require("./routes/api-route.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const path = require("path");
const request = require("request");

const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'react-client/my-app/build'),{index:false}) );

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

app.use('/favicon.ico', (req, res, next) => {res.status(204).end(); });

app.get("/welcome",function(req,res,next){
  console.log("Req: "+req.rawHeaders);
  // for(prop in req.hea){
  //   console.log(prop+"->"+res.header("redirect")[prop]);
  // }
  console.log("Res: "+res.getHeaderNames());

  console.log("QUERY STR: "+req.query.isRedirected);
  authCheck(req,res,next);
});

app.get("/",function(req,res,next){
  hasValidToken(req,function(resFlag){
    resFlag?res.redirect("/welcome"):next();;
  });

});

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    console.log("vliza si" +req.url);
    res.sendFile(path.join(__dirname + '/react-client/my-app/build/index.html'));
})

app.listen(3001, function() {
  console.log("now listening on port 3001");
});

function hasValidToken(req,callback){

  let token = getTokenCookie(req);
  if(!token){
    callback(false);
    return false;
  }

  let headers = {
    Authorization: "Bearer " + token,
    gzip: true,
    json: true
  };
  // Configure the request
  let options = {
    url: "https://sphereapi-apimanager.lab.sofi.axway.int:8065/sphere/api/v1/account",
    method: "GET",
    agentOptions: {
      rejectUnauthorized: false
    },
    headers: headers
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(true);
      return true;
    }else{
      console.log(error);
      callback(false);
      return false;
    }
  });
}

function authCheck(req,res,next){
  console.log("authcheck here");
  hasValidToken(req,function(resFlag){
    resFlag?next():res.redirect("/");
  });
  
}
function getTokenCookie(req){
  if(req.header("cookie")){
      let cookiesArr = req.header("cookie").split(";");
      for(let i=0;i<cookiesArr.length;i++){
          let cookie = cookiesArr[i].trim().split("=");
          let key = cookie[0];
          let value = cookie[1];
          if(key==="token"){
              return value;
          }
      }
  }else{
      return "";
  }
}
