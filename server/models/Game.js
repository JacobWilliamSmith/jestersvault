const mongoose = require('mongoose')
import Character from './Character'

// TODO: Hash game passwords

const GameSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "can't be blank"]
  },
  privilegedViewer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    default: []
  }],
  unprivilegedViewer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    default: []
  }],
  num_anonymous_viewers: {
    type: Integer,
    required: true,
    default: 0
  },
  name: {
    type: String,
    required: true,
    default: "Unnamed Game"
  },
  password: {
    type: String,
    required: false
  },
  privacy_level: {
    type: String,
    enum: ['public-link', 'private-link'], // Note that there is a third privacy level, solo. Solo is hosted client-side
    required: true,
    default: 'private-link'
  },
  turn: {
    type: Integer,
    required: false
  },
  characters: [{
    type: Character,
    required: true,
    default: []
  }]
})

module.exports = mongoose.model('Game', GameSchema)