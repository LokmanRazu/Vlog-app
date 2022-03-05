const router = require('express').Router()

const { isAuthenticated } = require('../middleware/authMiddleWare')
const { uploadprofilePics } = require('../controllers/uploadController')
const upload = require('../middleware/uploadMiddleware')

router.post = ('/profilePics', isAuthenticated, upload.single('profilePics'), uploadprofilePics)
module.exports = router