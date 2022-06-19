const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "JestersVault API",
      sub: userID,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
};

userRouter.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).json({ message: { msgBody: "Error has occurred", msgError: true } });
    } else if (user) {
      res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
    } else {
      User.findOne({ email }, (err, user) => {
        if (err) {
          res.status(500).json({ message: { msgBody: "Error has occurred", msgError: true } });
        } else if (user) {
          res.status(400).json({ message: { msgBody: "Email is already taken", msgError: true } });
        } else {
          const newUser = new User({ username, email, password });
          newUser.save((err) => {
            if (err) {
              if (err.message) {
                res.status(500).json({ message: { msgBody: err.message, msgError: true } });
              } else {
                res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
              }
            } else {
              res
                .status(201)
                .json({ message: { msgBody: "Account successfully created", msgError: false } });
            }
          });
        }
      });
    }
  });
});

userRouter.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, username } = req.user;
    const token = signToken(_id);
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { username } });
  }
});

userRouter.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.clearCookie("access_token");
  res.json({ success: true });
});

userRouter.get("/authenticate", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { username } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { username } });
});

userRouter.post(
  "/characterPreset",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const characterPreset = { name: req.body.name, characterData: req.body.characterData };
    const presetIndex = req.user.characterPresets.findIndex(
      (preset) => preset.name == req.body.name
    );
    if (presetIndex !== -1) {
      req.user.characterPresets[presetIndex] = characterPreset;
    } else {
      req.user.characterPresets.push(characterPreset);
    }
    req.user.save((err) => {
      if (err) {
        res.status(500).json({ message: { msgBody: "Error has occurred", msgError: true } });
      } else {
        res
          .status(200)
          .json({
            characterPresets: req.user.characterPresets,
            message: { msgBody: "Successfully updated character presets", msgError: false },
          });
      }
    });
  }
);

userRouter.post("/gamePreset", passport.authenticate("jwt", { session: false }), (req, res) => {
  const gamePreset = { name: req.body.name, gameData: req.body.gameData };
  const presetIndex = req.user.gamePresets.findIndex((preset) => preset.name == req.body.name);
  if (presetIndex !== -1) {
    req.user.gamePresets[presetIndex] = gamePreset;
  } else {
    req.user.gamePresets.push(gamePreset);
  }
  req.user.save((err) => {
    if (err) {
      res.status(500).json({ message: { msgBody: "Error has occurred", msgError: true } });
    } else {
      res
        .status(200)
        .json({
          gamePresets: req.user.gamePresets,
          message: { msgBody: "Successfully updated game presets", msgError: false },
        });
    }
  });
});

userRouter.get(
  "/characterPresets",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ characterPresets: req.user.characterPresets });
  }
);

userRouter.get("/gamePresets", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.status(200).json({ gamePresets: req.user.gamePresets });
});

userRouter.delete(
  "/characterPreset/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.characterPresets.findIndex((preset) => preset._id == req.params.id) === -1) {
      res
        .status(400)
        .json({
          message: { msgBody: "You do not have a character preset with this ID", msgError: true },
        });
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { characterPresets: { _id: req.params.id } } },
        { returnOriginal: false },
        (err, user) => {
          if (err) {
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
          } else {
            res
              .status(200)
              .json({
                characterPresets: user.characterPresets,
                message: { msgBody: "Successfully deleted character preset", msgError: false },
              });
          }
        }
      );
    }
  }
);

userRouter.delete(
  "/gamePreset/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.gamePresets.findIndex((preset) => preset._id == req.params.id) === -1) {
      res
        .status(400)
        .json({
          message: { msgBody: "You do not have a game preset with this ID", msgError: true },
        });
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { gamePresets: { _id: req.params.id } } },
        { returnOriginal: false },
        (err, user) => {
          if (err) {
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
          } else {
            res
              .status(200)
              .json({
                gamePresets: user.gamePresets,
                message: { msgBody: "Successfully deleted game preset", msgError: false },
              });
          }
        }
      );
    }
  }
);

module.exports = userRouter;
