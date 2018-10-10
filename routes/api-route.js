const router = require("express").Router();
const request = require("request");

function authCheck(req,res,next){

  if( !( req.header("token")||getTokenCookie(req) ) ){
    //if user has auth token
    res.redirect("/auth/login");
  }else{
    console.log("authcheck here");
    //if logged in
    next();
  }
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

router.get("/home",authCheck, function(req, res) {
  res.render("new-home");
});

/////////////////////////////////////////////////////////////
router.get("/account",authCheck, function(req, res) {
  console.log("TOVA E ACCOUNT");
  console.log(req.header("token"));
  // Set the headers

  let options = configRequest(req.header("token"),"/account","GET","");
  startRequest(options,res);
});

////////////////////////////////////////////////////////////////////
router.get("/product",authCheck, function(req, res) {
  console.log("TOVA E PRODUCT");
  console.log(req.header("token"));
  // Set the headers

  for(prop in req.query){
    console.log(req.query[prop]);
  }

  let options = configRequest(req.header("token"),"/product","GET","?sac="+req.query.sac);
  startRequest(options,res);
});

////////////////////////////////////////////////////////////////////
router.get("/case",authCheck, function(req, res) {
  console.log("TOVA E CASE");
  console.log(req.header("token"));
  // Set the headers

  let options = configRequest(req.header("token"),"/case","GET","");
  startRequest(options,res);
});

////////////////////////////////////////////////////////////////////
router.get("/case/:id",authCheck, function(req, res) {
  console.log("TOVA E CASE");
  console.log(req.header("token"));
  // Set the headers

  let options = configRequest(req.header("token"),"/case","GET","/"+req.params.id);
  startRequest(options,res);
});

function startRequest(options,res){
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      // console.log(body);
      res.send(body);
    }else{
      console.log(error);
    }
  });
}

function configRequest(token,route,method,queryString){
  let headers = {
    Authorization: "Bearer " + token,
    gzip: true,
    json: true
  };

  // queryString = "?"+"sac"+queryString.sac;
  // if("?"===queryString) queryString = "";

  console.log("https://sphereapi-apimanager.lab.sofi.axway.int:8065/sphere/api/v1"+route+queryString);

  // Configure the request
  let options = {
    url: "https://sphereapi-apimanager.lab.sofi.axway.int:8065/sphere/api/v1"+route+queryString,
    method: method,
    agentOptions: {
      rejectUnauthorized: false
    },
    headers: headers
  };

  return options;
}

module.exports = router;
