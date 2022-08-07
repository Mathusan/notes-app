const  User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')


const userCtrl = {
    registerUser: async (req,res)=> {
        try {
            const {userId,email,password} = req.body
            const user = await User.findOne({email: email})
            if(user) return res.status(400).json({msg:"This email already exists"})  // check if email already exists 
            
            
            const passwordHash = await bcrypt.hash(password,10) // password hashing 
            
            const newUser = new User({
                id : userId,
                email : email,
                password : passwordHash,
                accountType : 'Student'               
            })
            await newUser.save()
            res.json({msg: "Register successful"})
        } catch (err) {
            return res.status(500).json({msg : err.message})
        }
        
    },
    loginUser: async (req,res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email:email})                          // check if user eixts
            if(!user) return res.status(400).json({msg: "User does not exist"})

            const isMatch = await bcrypt.compare(password, user.password)          // compare password hash with user's password hash
            if(!isMatch) return res.status(400).json({msg:"Incorrect Password"})

            const payload = {id: user._id, name: user.email}
            const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {expiresIn:"1d"})

            res.json({token})
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

    }
}

module.exports = userCtrl