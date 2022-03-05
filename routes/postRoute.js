const router = require('express').Router()
const {isAuthenticated} = require('../middleware/authMiddleWare')
const upload = require('../middleware/uploadMiddleware')
const{
    createpostGetController,
    createpostPostController
} = require('../controllers/postController')

router.get('/create',createpostGetController)
router.post('/create',isAuthenticated, createpostPostController)

module.exports = router