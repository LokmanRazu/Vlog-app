const User = require('../models/user')
const bcrypt = require('bcrypt')


// SIGNUP GET CONTROLLER
exports.signupGetController = (req, res, next)=>{

    res.render('pages/auth/signup',{title:'Creat a New Account '})
}


// SIGNUP POST CONTROLLER
exports.signupPostController =async (req, res, next)=>{
    let{username,email,password} = req.body
 
try{
    let hashedPassword =await bcrypt.hash(password,11)
    let user = new User({
        username,
        email,
        password:hashedPassword
})
    await user.save()
    console.log('user created successfully')
    res.render('pages/auth/login',{title:'Creat a New Account '})
}catch(e){
   console.log(e)
   next()
}



// LOGIN GET CONTROLLER
}
exports.loginGetController = (req, res, next)=>{
    console.log(req.session,req.user)
    res.render('pages/auth/login',{title:'Login To Your Account '})


// LOGIN POST CONTROLLER
}
exports.loginPostController =async (req, res, next)=>{
    let {email,password} = req.body
    try{
        let user = await User.findOne({ email })
        if(!user){
            return res.json({
                message:'Invalid Credential'
            })
        }
        let match =await bcrypt.compare(password, user.password)
        if(!match){
            return res.json({
                message:'Invalid Credential'
            })
            
        }
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err =>{
            if(err){
                console.log(err)
                return next(err)
            }
           res.redirect('/dashboard')
        })

    }
    catch(e){
        console.log(e);
        next()
    }
};






// LOGOUT CONTROLLER
exports.logoutController = (req, res, next)=>{
    req.session.destroy(err =>{
        if(err){
            console.log(err)
            return next(err)
        }
        return res.redirect('/auth/login')
    })
}