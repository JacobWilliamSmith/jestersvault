const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

const signToken = userID => {
  return JWT.sign({
    iss: 'JestersVault API',
    sub: userID
  }, config.JWTSecret, {expiresIn: "10d"})
}

userRouter.post('/register',(req,res)=>{
  const {username, email, password} = req.body;
  User.findOne({username},(err,user)=>{
    if(err) {
      res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}})
    } else if(user) {
      res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}})
    } else {
      User.findOne({email},(err,user)=>{
        if(err) {
          res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}})
        } else if(user) {
          res.status(400).json({message: {msgBody: "Email is already taken", msgError: true}})
        } else {
          const newUser = new User({username, email, password})
          newUser.save(err=>{
            if(err) {
              if(err.message) {
                res.status(500).json({message: {msgBody: err.message, msgError: true}})
              } else {
                res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
              }
            } else {
              res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}})
            }
          })
        }
      })
    }
  })
})

userRouter.post('/login',passport.authenticate('local',{session: false}),(req,res)=>{
  if(req.isAuthenticated()) {
    const {_id, username} = req.user;
    const token = signToken(_id);
    res.cookie('access_token', token, {httpOnly: true, sameSite: true});
    res.status(200).json({isAuthenticated: true, user: {username}})
  }
});

userRouter.get('/logout',passport.authenticate('jwt',{session: false}),(req,res)=>{
  res.clearCookie('access_token');
  res.json({success: true});
});

userRouter.get('/authenticate', passport.authenticate('jwt',{session: false}),(req,res) => {
  const {username} = req.user;
  res.status(200).json({isAuthenticated: true, user: {username}});
})

module.exports = userRouter;