const mongoose = require('mongoose')

const CharacterPresetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Unnamed Character"
    },
    characterData: {
      type: String,
      required: true,
      default: "{}"
    }
  }
)

module.exports = mongoose.model('CharacterPreset', CharacterPresetSchema)