const Profile = require('../models/profile')
const User = require('../models/user')


// DashBoard Get Controller
exports.dashBoardGetController =async (req,res,next)=>{
    try {
        let profile = await Profile.findOne({user:req.user._id})
        if(profile){
            return res.render('pages/dashboard/dashboard',{title:'My dashboard'})
        }
        res.redirect('/dashboard/create-profile')
    }catch(e){
        next(e)
    }
}


// create Profile Get Controller
exports.createProfileGetController = async(req,res,next)=>{
        try{
            let profile = await Profile.findOne({user:req.user._id})
            if(profile){             
               return res.redirect('/dashboard/edit-profile')
            }
            res.render('pages/dashboard/create-profile',{title:'CREAT YOUR PROFILE'})
        }catch(e){
            next(e)
        }
}


// create Profile post Controller 
exports.createProfilePostController = async(req,res,next)=>{
    let {name,title,bio,website,facebook,twitter} = req.body
    try{
      let body = {
          user:req.user._id,
          name,
          title,
          bio,
          profilePics:req.user.profilePics||'',
          links:{
              website:website||'',
              facebook:facebook||'',
              twitter:twitter||''
          },
          posts:[],
          bookmarks:[]
      }
      let profile = new Profile(body)
      console.log(profile)
      let createdProfile = await profile.save()
      await User.findOneAndUpdate(
         {_id:req.user._id},
         {$set:{profile:createdProfile._id}}
      )
      res.redirect('/dashboard')
    }catch(e){
        next(e)
    }

}



// edit Profile Get Controller
exports.editProfileGetController = async(req,res,next)=>{
    try{
        let profile = await Profile.findOne({user:req.user._id})
        console.log(profile)
        if(!profile){
           return res.redirect('/dashboard/create-profile')
        }
        res.render('pages/dashboard/edit-profile',{title:'Edit Profile',profile})



    }catch(e){
        next(e)
    }
    
}



// Edit Profile Post Controller
exports.editProfilePostController =async (req,res,next)=>{
    let {name,title,bio,website,facebook,twitter} = req.body
    try{
        let profile = {
            user:req.user._id,
            name,
            title,
            bio,
            links:{
                website:website||'',
                facebook:facebook||'',
                twitter:twitter||''
            },
            posts:[],
            bookmarks:[]
        }
        let updatedProfile  = await Profile.findOneAndUpdate({user:req.user._id},{$set:profile},{new:true})
        res.render('pages/dashboard/edit-profile',{title:'Edit Your Profile',profile:updatedProfile})

    }catch(e){
        next(e)
    }
}