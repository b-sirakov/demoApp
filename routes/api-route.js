const router = require("express").Router();
const request = require("request");
const multer = require("multer");
const upload = multer();

function authCheck(req,res,next){

  console.log();
  console.log("Auth: "+getTokenCookie(req));

  if( !( req.header("token")||getTokenCookie(req) ) ){
    //if user has auth token
    res.redirect("/");
  }else{
    console.log("authcheck here");
    console.log();
    //if logged in
    next();
  }
}

function getTokenCookie(req){
  if(req.header("cookie")) {
      let cookiesArr = req.header("cookie").split(";");
      for(let i=0; i<cookiesArr.length; i++){
          let cookie = cookiesArr[i].trim().split("=");
          let key = cookie[0];
          let value = cookie[1];
          if(key === "token"){
              return value;
          }
      }
  } else {
      return "";
  }
}

/////////////////////////////////////////////////////////////
router.get("/account", authCheck, function(req, res) {
  console.log("TOVA E ACCOUNT");
  console.log(req.header("token"));
  // Set the headers
  
  let options = configRequest(req.header("token"), "/account", "GET", "");
  startRequest(options,res);
});

////////////////////////////////////////////////////////////////////
router.get("/product", authCheck, function(req, res) {
  console.log("TOVA E PRODUCT");
  console.log(`req.header("token") = ${req.header("token")}`);
  // Set the headers

  for(prop in req.query){
    console.log(`req.query[prop] = ${req.query[prop]}`);
  }

  let options = configRequest(req.header("token"), "/product", "GET", "?sac=" + req.query.sac);
  startRequest(options,res);
});

////////////////////////////////////////////////////////////////////
router.get("/case", authCheck, function(req, res) {
  console.log("TOVA E CASE");
  console.log(req.header("token"));
  // Set the headers

  let options = configRequest(req.header("token"), "/case", "GET", "");
  startRequest(options,res);
});

////////////////////////////////////////////////////////////////////
router.get("/case/:id", authCheck, function(req, res) {
  console.log("TOVA E CASE");
  console.log(req.header("token"));
  // Set the headers

  let options = configRequest(req.header("token"), "/case", "GET", "/" + req.params.id);
  startRequest(options,res);
});

////////////////////////////////////////////////////////////////////
router.get("/attachment",authCheck, function(req, res) {
  console.log("TOVA E ATTACHMENT");
  console.log(req.header("token"));
  // Set the headers

  for(prop in req.query){
    console.log("Printing in attachment router: "+prop+"= "+req.query[prop]);
  }
  
  let options = configRequest(getTokenCookie(req),"/attachment","GET",("?"+"caseId="+req.query.caseId+"&"+"attachmentId="+req.query.attachmentId) ) ;
  request(options).pipe(res);

});

///////////////////////////////////////////////////////////////////
router.post("/case", authCheck , upload.any() , function(req, res) {
  console.log("TOVA E CASE POST..");
  let token = getTokenCookie(req);
  console.log(token);

  let caseFromReq = req.body;
  let errMsg = areThereEmpyFields(caseFromReq);

  if(errMsg){
    res.status(400).json({status: 400,message: errMsg});
    console.log(errMsg);
    return ;
  }

  let caseObj = {
    description: caseFromReq.description,
    environment: caseFromReq.environment,
    product:{  
      id: caseFromReq.id,
      os:{ id: caseFromReq.os},
      version:{ id: caseFromReq.version}
    },
    sac: caseFromReq.sac,
    severity: caseFromReq.severity,
    subject: caseFromReq.subject
  }

  files = req.files;
  console.log("TUKA SI SE LOGVAME ____-----> LENGHT: "+files.length);

  let headers = {
    Authorization: "Bearer " + token,
    gzip: true,
    json: true
  };

  let formData = {}

  formData['initializer'] =  { value: JSON.stringify(caseObj) , options: {contentType: "application/json"} };
  formData.attachment = [];

  for(let i=0;i<files.length;i++){
    let file = files[i];

    formData.attachment.push({
        value: file.buffer ,
        options: {
          filename: file.originalname
        }
    })

  }

  request.post({url:'https://sphereapi-apimanager.lab.sofi.axway.int:8065/sphere/api/v1/case',"formData":formData, headers:headers, agentOptions: {rejectUnauthorized: false}}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      res.status(500).json({status:500,message:"Something went wrong"});
      console.error('upload failed:', err);
    }else{
      console.log("Server Status: " + httpResponse.statusMessage);
      // console.log("Body of response"+ httpResponse.body);
      if(httpResponse.statusCode == 201){
        res.status(201).send({status:201, message: httpResponse.statusMessage});
      }else{
        res.status(httpResponse.statusCode).send({status:httpResponse.statusCode, message: httpResponse.statusMessage});
      }
    }
    
  });

});
////////////////////////////////////////////////////////////////////////////
router.post("/note", authCheck , upload.any() , function(req,res) {
  console.log("TOVA E NOTE POST");

  let token = getTokenCookie(req);
  console.log(token);

  let noteReq = req.body;
  let errMsg = areThereEmpyFields(noteReq);

  if(errMsg){
    res.status(400).json({status: 400,message: errMsg});
    console.log(errMsg);
    return ;
  }

  files = req.files;
  console.log("TUKA SI SE LOGVAME ____-----> LENGHT: "+files.length);

  let headers = {
    Authorization: "Bearer " + token,
    gzip: true,
    json: true
  };

  let formData = {}

  console.log("wewewewew"+JSON.stringify(noteReq,null,4));
  console.log(noteReq);
  formData['initializer'] =  { value: JSON.stringify(noteReq) , options: {contentType: "application/json"} };
  formData.attachment = [];

  for(let i=0;i<files.length;i++){
    let file = files[i];

    formData.attachment.push({
        value: file.buffer ,
        options: {
          filename: file.originalname
        }
    })

  }

  request.post({url:'https://sphereapi-apimanager.lab.sofi.axway.int:8065/sphere/api/v1/note',"formData":formData, headers:headers, agentOptions: {rejectUnauthorized: false}}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      res.status(500).json({status:500,message:"Something went wrong"});
      console.error('upload failed:', err);
    }else{
      console.log("Server Status: " + httpResponse.statusMessage);
      // console.log("Body of response"+ httpResponse.body);
      if(httpResponse.statusCode == 201){
        res.status(201).send({status:201, message: httpResponse.statusMessage});
      }else{
        res.status(httpResponse.statusCode).send({status:httpResponse.statusCode, message: httpResponse.statusMessage});
      }
    }
    
  });
});

////////////////////////////////////////////////////////////////////////////
router.delete("/case", authCheck , upload.any() , function(req,res) {
  console.log("TOVA E CASE DELETE");

  let token = getTokenCookie(req);
  console.log(token);

  let delReq = req.body;
  let delReqJSON = JSON.stringify(delReq,null,4);
  let errMsg = areThereEmpyFields(delReq);

  if(errMsg){
    res.status(400).json({status: 400,message: errMsg});
    console.log(errMsg);
    return ;
  }

  let headers = {
    Authorization: "Bearer " + token,
    gzip: true,
    json: true,
    'content-type': 'application/json'
  };

  console.log(JSON.stringify(delReq,null,4));
  console.log(delReqJSON);

  request.delete({url:'https://sphereapi-apimanager.lab.sofi.axway.int:8065/sphere/api/v1/case', body:delReqJSON, headers:headers, agentOptions: {rejectUnauthorized: false}}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      res.status(500).json({status:500,message:"Something went wrong"});
      console.error('upload failed:', err);
    }else{
      console.log("Server Status: " + httpResponse.statusMessage);
      console.log("Body of response"+ httpResponse.body);
      if(httpResponse.statusCode == 200){
        res.status(200).send({status:200, message: httpResponse.statusMessage});
      }else{
        res.status(httpResponse.statusCode).send({status:httpResponse.statusCode, message: httpResponse.statusMessage});
      }
    }
    
  });
});


function startRequest(options,res){
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      // console.log("Body of request "+body);
      res.send(body);
    }else{
      console.log("Error: "+error);
    }
  });
}

function configRequest(token, route, method, queryString){
  let headers = {
    Authorization: "Bearer " + token,
    gzip: true,
    json: true
  };

  console.log("https://sphereapi-apimanager.lab.sofi.axway.int:8065/sphere/api/v1"+route+queryString);

  // Configure the request
  let options = {
    url: "https://sphereapi-apimanager.lab.sofi.axway.int:8065/sphere/api/v1" + route + queryString,
    method: method,
    agentOptions: {
      rejectUnauthorized: false
    },
    headers: headers
  };

  return options;
}

function areThereEmpyFields( caseObj ){
  let prop;
  let msg="";
  for(prop in caseObj){
    if(!caseObj[prop]){
      msg+=prop+" field must not be empy";
    }
  }

  return msg;
}

module.exports = router;
