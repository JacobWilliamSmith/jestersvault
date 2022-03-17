const express = require('express');
const debugRouter = express.Router();
const User = require('../models/User');

debugRouter.get('/users', (req,res)=> {
  User.find().exec((err,document) => {
    if(err) {
      res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}})
    } else {
      res.status(200).json({users: document})
    }
    
  })
})

debugRouter.delete('/users', (req,res)=> {
  User.remove({},(err, document) => {
    if(err) {
      res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}})
    } else {
      res.json({success: true});
    }
  })
})

module.exports = debugRouter;