const  User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const Token = require('../models/token')
const crypto = require('crypto')
const emailvalidator = require('email-validator')
const sendEmail = require('../utils/sendMail')

const userCtrl = {
    registerUser: async (req,res)=> {
        try {
            const {email} = req.body
            let user = await User.findOne({email: email}) // check if email already exists
            if(user) return res.status(400).json({msg:"This email already exists"})  
            
            if(!emailvalidator.validate(email)) return res.status(400).json({msg:"This email is invalid"})

            const password = crypto.randomBytes(8).toString("hex") // generate temporary password
            const passwordHash = await bcrypt.hash(password,10)

            user = await new User({email: email, password: passwordHash,accountType:"Student"}).save()

            // create token
            // const token = await new Token({
            //     userId: user._id,
            //     token: crypto.randomBytes(8).toString("hex")
            // }).save();

            const url = `login - ${process.env.BASE_URL} \npassword = ${password}`
            //const url = `${process.env.BASE_URL.toString()}users/login}`
            //const url = `${process.env.BASE_URL.toString()}users/${user._id}/verify/${token.token}`
            await sendEmail(user.email,"Verify Email",url)
            
            res.status(201).send({msg:"An Email has been sent to your account for verification"})
        } catch (err) {
            return res.status(500).json({msg : err.message})
        }
        // try {
        //     const {firstName,lastName,email,password} = req.body
        //     const user = await User.findOne({email: email})
        //     if(user) return res.status(400).json({msg:"This email already exists"})  // check if email already exists 
            
        //      // create random password to send with email , hash it too
        //     const passwordHash = await bcrypt.hash(password,10) // password hashing 
            
        //     const newUser = new User({
        //         firstName: firstName,
        //         lastName: lastName,
        //         email : email,
        //         password : passwordHash,
        //         accountType : 'Student'               
        //     })
        //     await newUser.save()
        //     res.json({msg: "Register successful"})
        // } catch (err) {
        //     return res.status(500).json({msg : err.message})
        // }
        
    },
    loginUser: async (req,res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email:email})                          // check if user eixts
            if(!user) return res.status(400).json({msg: "User does not exist"})

            const isMatch = await bcrypt.compare(password, user.password)          // compare password hash with user's password hash
            if(!isMatch) return res.status(400).json({msg:"Incorrect Password"})

            if(!user.verified){

            }

            const payload = {id: user._id, name: user.email}
            const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {expiresIn:"1d"})
            
            res.json({token,user})
            
        } catch (err) {
            return res.status(500).json({msg : err.message})
        }
    },
    verifiedToken: async (req, res) => {
        try {
             const token = req.header("Authorization")
             if(!token) return res.send(false)

            jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err,verified) =>{
                if(err) return res.send(false)

                const user = await User.findById(verified.id)
                if(!user) return res.send(false)

                return res.send(true)
            })
        } catch (err) {
            return res.status(500).json({msg : err.message})
        }

    },
    emailVerify: async (req,res) =>{
        try {
            const user  = await User.findOne({_id:req.params.id})
            if(!user) return res.status(400).send({msg:"Invalid link"})

            const token = await Token.findOne({
                userId : user._id,
                token: req.params.token
            })

            if(!token) return res.status(400).send({msg : "invalid  link"}) 

            await User.updateOne({_id:user._id, verified:true})
            await token.remove()

            res.status(200).send({msg:"Email verified successfully"})

        } catch (err) {
            return res.status(500).json({msg : err.message})
        }
    },
    updateProfile : async (req,res) => {
        try {
            const user = await User.findOne({id : req.user.id})
            if(!user) return res.status(401).send({msg : "User does not exist"})

            const passwordHash = await bcrypt.hash(req.body.password,10)

            user.firstName = req.body.firstName
            user.lastName = req.body.lastName
            user.dateOfBirth = req.body.dateOfBirth
            user.mobile = req.body.mobile
            user.password = passwordHash
            user.status = true

            await user.save()
            res.status(200).send({data:user,msg:"User Profile completed successfully"})
        } catch (err) {
            res.status(500).send({msg:err.message})
        }
    },
    getUsers : async (req,res) => {
        try{
            const users = await User.find({accountType: {$ne: 'Admin' }, status: true})

            res.status(200).send({data: users})
        } catch(err) {
            res.status(500).send({msg:err.message})
        }
    },
    searchUser : async (req,res) => {
        try{
            if(req.params.type === 'name') {
                const user = await User.find({
                    $or: [{firstName: new RegExp('.*'+req.params.param+'.*')}, {lastName: new RegExp('.*'+req.params.param+'.*')}]
                })
                if(!user) return res.status(401).send({message: 'User does not exists'})

                res.status(200).send({data: user})
            } else if(req.params.type === 'email') {
                const user = await User.find({email: req.params.param})
                if(!user) return res.status(401).send({message: 'User does not exists'})

                res.status(200).send({data: user})
            } else if(req.params.type === 'id') {
                const user = await User.find({id: req.params.param})
                if(!user) return res.status(401).send({message: 'User does not exists'})

                res.status(200).send({data: user})
            } else {
                return res.status(400).send({message: 'Type not found'})
            }
        } catch(error) {
            res.status(500).send({msg:err.message})
        }
    }
}

module.exports = userCtrl