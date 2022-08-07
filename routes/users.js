const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/userController')
const auth = require('../middleware/auth')

//register a user
router.post('/register', userCtrl.registerUser)
// user login
router.post('/login', userCtrl.loginUser)

router.get('/verify', userCtrl.verifiedToken)




module.exports = router