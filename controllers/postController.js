const readingtime = require('reading-time')
const Post = require('../models/post')
const Profile = require('../models/profile')

exports.createpostGetController = (req,res,next)=>{
    res.render('pages/dashboard/post/createPost',{title:'create your post'})
 
}


exports.createpostPostController =async (req,res,next)=>{
console.log("================",req.body)
    try{
        let {title,body,tags} = req.body
        // res.render('pages/dashboard/post/creatPost',{title:'create your post'})
        if(tags){
            tags = tags.split(',')
        }
        // let readTime = readingtime(body).text
        let post = new Post({
            title,
            body,
            tags,
            author:req.user._id,
            thumbnail:'',
            // readTime,
            likes:[],
            dislikes:[],
            Comments:[]
        })
        let createdPost = await post.save();
        console.log("================",createdPost)
     //   await Profile.findOneAndUpdate({user:req.user._id},{$push:{'posts':createdPost}}) 
      //  console.log('2nddddd',Profile)
        return res.render(`pages/dashboard/post/posts`,{title:"your post", createdPost})
    }catch(e){
        next(e);
    }
};

exports.postGetController = async(req,res,next)=>{
try{
let thePost  = await Post.find({author:req.user._id})
console.log("==========",thePost)
res.render(`pages/dashboard/post/myPost`,{title:"My post",thePost})
}catch(e){
    next(e)
}
}