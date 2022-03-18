const mongoose = require('mongoose');

const CharacterSchema = mongoose.Schema({
  characterName: {
      type: String
  },
  playerName: {
      type: String
  },
  description: {
      type: String
  },
  initiative: {
      type: String
  },
  armorClass: {
      type: String
  },
  hitPoints: {
      type: String
  },
  imageLink: {
      type: String
  }
})

module.exports = mongoose.model('Character', CharacterSchema)