const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/userController')
const {auth, adminAuth} = require('../middleware/auth')


router.route('/')
    .get(auth,adminAuth,userCtrl.getUsers)
    .put(auth,userCtrl.updateProfile)


router.get('/:type/:param' , auth,adminAuth,userCtrl.searchUser)

//register a user *only with admin permissions
router.post('/register',/*auth,adminAuth,*/ userCtrl.registerUser)
// user login
router.post('/login', userCtrl.loginUser)

router.get('/verify', userCtrl.verifiedToken)

router.get('/:id/verify/:token' , userCtrl.emailVerify)



module.exports = router