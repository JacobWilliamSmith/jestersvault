require('dotenv').config()

module.exports = {
  serverPort: process.env.SERVER_PORT,
  serverDb: process.env.SERVER_DB,
  JWTSecret: process.env.JWT_SECRET,
}