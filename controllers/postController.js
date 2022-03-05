const readingtime = require('reading-time')
const Post = require('../models/post')
const Profile = require('../models/profile')

exports.createpostGetController = (req,res,next)=>{
    res.render('pages/dashboard/post/createPost',{title:'create your post'})
 
}


exports.createpostPostController =async (req,res,next)=>{
    let {title,body,tags} = req.body
    // res.render('pages/dashboard/post/creatPost',{title:'create your post'})
    if(tags){
        tags = tags.split(',')
    }
    let readTime = readingtime(body).text
    let post = new Post({
        title,
        body,
        tags,
        author:req.user._id,
        thumbnail:'',
        readTime,
        likes:[],
        dislikes:[],
        Comments:[]
    })
    try{
        let createdPost = await post.save()
        await Profile.findOneAndUpdate({user:req.user._id},{$push:{'posts':createdPost}})
        console.log('2nd',Profile)
        return res.redirect(`/posts/edit/${createdPost._id}`)
    }catch(e){
        next(e)
    }
}