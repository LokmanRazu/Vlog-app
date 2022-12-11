const router = require('express').Router()
const {isAuthenticated} = require('../middleware/authMiddleWare')
const upload = require('../middleware/uploadMiddleware')
const{
    createpostGetController,
    createpostPostController,
    postGetController
} = require('../controllers/postController')

router.get('/create',isAuthenticated,createpostGetController)
router.post('/create', isAuthenticated,createpostPostController)
router.get('/thePost',isAuthenticated,postGetController)

module.exports = router