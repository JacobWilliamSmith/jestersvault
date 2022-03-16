const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');
const config = require('./config');

const cookieExtractor = req => {
  let token = null;
  if(req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// Authorization using Json Web Tokens
passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: config.JWTSecret
}, (payload, done) => {
  User.findById({_id: payload.sub}, (err, user) => {
    // Check if there are issues related to 
    if(err) { return done(err, false); }

    // Check if the User exists
    if(!user) { return done(null, false); }

    // The user exists, return them
    return done(null, user);
  });
}));

// Authentication using username and password
passport.use(new LocalStrategy((username, password, done)=>{
  User.findOne({username},(err,user)=>{
    // Check if there are issues related to database
    if(err) { return done(err); }
      
    // Check if the User exists
    if(!user) { return done(null, false); }
      
    // Check if the password matches
    user.comparePassword(password, done);
  })
}))