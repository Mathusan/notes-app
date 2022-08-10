const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    // id:{ 
    //     type: Number,
    //     required : false,      // change id so that it only contains numerics
    //     unique : true
    // },
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
        required : false,
        default: false

    },
    password:{
        type: String,
        required : true
    },
    accountType:{
        type: String,
        required : true,
        default : "Student"
    },
    verified: {
        type:Boolean, 
        default: false
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema )