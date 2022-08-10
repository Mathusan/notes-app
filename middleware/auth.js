const jwt = require('jsonwebtoken')
const  User = require('../models/user')


const auth = async (req,res,next)=> {
    try{
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({ msg: "Invalid  Authentication"})

        try {
            const decoded = jwt.verify(token,process.env.TOKEN_SECRET_KEY)

            req.user = await User.findById(decoded.id).select('-password')
            
            next()

        } catch (err) {
            
        }
        // jwt.verify(token, process.env.TOKEN_SECRET_KEY,(err,user)=>{
        //     if(err) return res.status(400).json({msg: "Authorization not valid"})
            
        //     req.user = user
            
        //     next()
        // })
    } catch (err) {
        return res.status(500).json({msg : err.message})

    }
}

const adminAuth = (req,res,next)=> {
    try {
        if (req.user.accountType !== "Admin"){
            res.status(401)
            return res.send("Not Allowed")
        }
        next()
    } catch (err) {
        return res.status(500).json({msg : err.message})
    }
}

module.exports = {auth , adminAuth}