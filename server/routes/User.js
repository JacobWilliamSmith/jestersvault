const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const CharacterPreset = require('../models/CharacterPreset');
const GamePreset = require('../models/GamePreset');
require("dotenv").config();

const signToken = userID => {
  return JWT.sign({
    iss: 'JestersVault API',
    sub: userID
  }, process.env.JWT_SECRET, {expiresIn: "10d"});
}

userRouter.post('/register',(req,res)=>{
  const {username, email, password} = req.body;
  User.findOne({username},(err,user)=>{
    if(err) {
      res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
    } else if(user) {
      res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}});
    } else {
      User.findOne({email},(err,user)=>{
        if(err) {
          res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
        } else if(user) {
          res.status(400).json({message: {msgBody: "Email is already taken", msgError: true}});
        } else {
          const newUser = new User({username, email, password});
          newUser.save(err=>{
            if(err) {
              if(err.message) {
                res.status(500).json({message: {msgBody: err.message, msgError: true}});
              } else {
                res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
              }
            } else {
              res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}});
            }
          });
        }
      });
    }
  });
});

userRouter.post('/login',passport.authenticate('local',{session: false}),(req,res)=>{
  if(req.isAuthenticated()) {
    const {_id, username} = req.user;
    const token = signToken(_id);
    res.cookie('access_token', token, {httpOnly: true, sameSite: true});
    res.status(200).json({isAuthenticated: true, user: {username}});
  }
});

userRouter.get('/logout',passport.authenticate('jwt',{session: false}),(req,res)=>{
  res.clearCookie('access_token');
  res.json({success: true});
});

userRouter.get('/authenticate', passport.authenticate('jwt',{session: false}),(req,res) => {
  const {username} = req.user;
  res.status(200).json({isAuthenticated: true, user: {username}});
});

userRouter.post('/characterPreset', passport.authenticate('jwt',{session: false}),(req,res) => {
  const characterPreset = new CharacterPreset(req.body);
  characterPreset.save(err=> {
    if(err) {
      res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
    } else {
      req.user.characterPresets.push(characterPreset);
      req.user.save(err=> {
        if(err) {
          res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
        } else {
          res.status(200).json({message: {msgBody: "Successfully created character preset", msgError: false}});
        }
      });
    }
  });
});

userRouter.post('/gamePreset', passport.authenticate('jwt',{session: false}),(req,res) => {
  const gamePreset = new GamePreset(req.body);
  gamePreset.save(err=> {
    if(err) {
      res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
    } else {
      req.user.gamePresets.push(gamePreset);
      req.user.save(err => {
        if(err) {
          res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
        } else {
          res.status(200).json({message: {msgBody: "Successfully created game preset", msgError: false}});
        }
      });
    }
  });
});

userRouter.get('/characterPresets',passport.authenticate('jwt',{session: false}),(req,res)=>{
  User.findById({_id: req.user._id}).populate('characterPresets').exec((err,document)=>{
      if(err) {
        res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
      } else {
        res.status(200).json({characterPresets: document.characterPresets, authenticated: true});
      }
  });
});

userRouter.get('/gamePresets',passport.authenticate('jwt',{session: false}),(req,res)=>{
  User.findById({_id: req.user._id}).populate('gamePresets').exec((err,document)=>{
      if(err) {
        res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
      } else {
        res.status(200).json({gamePresets: document.gamePresets, authenticated: true});
      }
  });
});

module.exports = userRouter;