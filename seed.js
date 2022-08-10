if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const mongoose = require('mongoose')
const User = require('./models/user')

const seed = require('./data/users')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})

const db = mongoose.connection
db.on('error',error  => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))


const seedAdmin = [seed]

try {
    const seedDB = async () => {
        await User.insertMany(seedAdmin)
    }

    seedDB().then(() =>{
        mongoose.connection.close()
    })

    console.log('added admin successfully')    
} catch (error) {
    console.log(error)    
}


