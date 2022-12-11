// Title,Body,Author,Tags,Thumbnail,readtime,Dislike,Coments
const {Schema,model} = require('mongoose')
const User = require('./user')
// const User = require('./Profile')
const Comment = require('./Comment')

const postSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxlength:100
    },
    body:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        // required:true
    },
    tags:[{
        type:String,
        required:true
    }],
    thumbnail:String,
    readtime:String,
    links:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    dsilikes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    comments:{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }
},{timestamps:true})


const Post = model('Post',postSchema)
module.exports = Post 