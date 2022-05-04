const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors');
require("dotenv").config();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));

app.use(cookieParser())
app.use(express.json())

const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const userRouter = require('./routes/User');
app.use('/user', userRouter);

const debugRouter = require('./routes/Debug');
app.use('/debug', debugRouter);

const PORT = process.env.NODE_DOCKER_PORT;

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`)
})