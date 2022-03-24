const express = require('express')
const app = express()
const config = require('./config')

const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.json())

const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const userRouter = require('./routes/User');
app.use('/user', userRouter);

const debugRouter = require('./routes/Debug');
app.use('/debug', debugRouter);

app.listen(config.serverPort, () => {
    console.log(`Express server running on port ${config.serverPort}`)
})