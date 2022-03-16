const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const apiPort = 8000

app.use(cookieParser())
app.use(express.json())


const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


// mongoose.connect('mongodb://127.0.0.1:27017/jestersvault', {useNewUrlParser: true}, ()=>{
//     console.log('Successfully connected to database');
// })

const userRouter = require('./routes/User');
app.use('/user', userRouter);

app.listen(apiPort, () => {
    console.log(`Express server running on port ${apiPort}`)
})