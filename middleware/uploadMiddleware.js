  const multer = require('multer')
const path = require('path')

const stroage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now + '-' + file.originalname)
    }
})

const upload = multer({
    stroage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:(req,file,cb)=>{
        const types = /jpeg|jpg|png|gif/
        const extName = types.test(path.extname(file.originalname).toLowerCase())
        const mimetype  = types.test(file.mimetype)

        if(extName && mimetype){
            cb(new Error('only support Image'))
        }
    }
})

module.exports = upload