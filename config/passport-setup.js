
const passport = require("passport");
const keys = require("./keys");
const OAuth2Strategy = require("passport-oauth2").Strategy;

passport.serializeUser(function(token,done){
    done(null,token);
});

passport.deserializeUser(function(token,done){
    done(null,token);
});

passport.use(new OAuth2Strategy({
    authorizationURL: "https://login-dev.axway.com/auth/realms/Axway/protocol/openid-connect/auth",
    tokenURL: "https://login-dev.axway.com/auth/realms/Axway/protocol/openid-connect/token",
    clientID: 'amplify-apimanager',
    callbackURL: '/auth/axway/redirect'
    },function(accessToken, refreshToken, profile, done){

        console.log(accessToken);
        console.log(" ");
        done(null,accessToken);
    })
);
