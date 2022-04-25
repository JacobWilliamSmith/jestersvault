const mongoose = require('mongoose')

const GamePresetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Unnamed Game"
    },
    gameData: {
      type: String,
      required: true,
      default: "[]"
    }
  }
)

module.exports = mongoose.model('GamePreset', GamePresetSchema)