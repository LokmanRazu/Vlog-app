//Post ,user , Reply , Body

const {Schema,model} = require('mongoose')
// const User = require('./user')
// const User = require('./Profile')
// const User = require('./Post')

const commentschema = new Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    body:{
        type:String,
        trim:true,
        required:true
    },
    replies:[
       {
           body:{
               type:String,
               required:true
           },
           user:{
               type:Schema.Types.ObjectId,
               ref:'User',
               required:true
           },
           createdat:{
               type:Date,
               default:new Date
           }
       }
    ]
},{timestamps:true})

const Comment = model('Comment',commentschema)
module.exports = Comment