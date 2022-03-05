// User , Title , Bio , ProfilePics , Links{fb,insta} , Post , Bookmarks

const {Schema,model} = require('mongoose')
// const User = require('./user')
// const User = require('./Post')


const profileSchema = new Schema ({
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:15
    },
    title:{
        type:String,
        trim:true,
        maxlength:100
    },
    bio:{
        type:String,
        trim:true,
        maxlength:500
    },
    profilePic:String,
    links:{
        website:String,
        facebook:String,
        twitter:String,
        github:String
    },
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    bookmarks:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
},{timestamps:true})
const Profile = model('profile',profileSchema)
module.exports = Profile