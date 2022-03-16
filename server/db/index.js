const mongoose = require('mongoose')
const config = require('../config')

try {
    mongoose.connect(config.serverDb, { useNewUrlParser: true }, ()=>{
        console.log('MongoDB database running on ' + config.serverDb);
    })
} catch (e) {
    console.error(config.serverDb, e.message)
}

const db = mongoose.connection

module.exports = db