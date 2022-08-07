const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    id:{
        type: Number,
        required : true,
        unique : true
    },
    firstName:{
        type: String,
        required : false
    },
    lastName:{
        type: String,
        required : false
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    dateOfBirth:{
        type: Date,
        required : false
    },
    mobile:{
        type: Number,
        required : false
    },
    status:{
        type: Boolean,
        required : false
    },
    password:{
        type: String,
        required : true
    },
    accountType:{
        type: String,
        required : true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema )