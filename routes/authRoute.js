const router = require('express').Router();
const {body} = require('express-validator')
// const user = require('../models/user')

const {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
} = require('../controllers/authController')
const {isUnAuthenticated} = require('../middleware/authMiddleWare')

// const signupValidator =[
//     body('username')
//     .isLength({min:2,max:15})
//     .withMessage(`User name must be 2 to 15 cheractar`)
//     .custom(username =>{

//     })
// ] 

router.get('/signup',isUnAuthenticated, signupGetController)
router.post('/signup',isUnAuthenticated, signupPostController)

router.get('/login',isUnAuthenticated, loginGetController)
router.post('/login',isUnAuthenticated, loginPostController)

router.get('/logout',logoutController)
module.exports = router;