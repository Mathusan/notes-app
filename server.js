if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const userRouter = require('./routes/users')
const noteRouter = require('./routes/notes')

//setting up server 
const app = express()
app.use(express.json())
app.use(cors())


//setting up mongoDB
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})

const db = mongoose.connection
db.on('error',error  => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))


app.use('/users', userRouter)
app.use('/api/notes', noteRouter)


app.listen(process.env.PORT || 1337)
  