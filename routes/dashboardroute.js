const router = require('express').Router();
const {isAuthenticated} = require('../middleware/authMiddleWare')
const {
    dashBoardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfileGetController,
    editProfilePostController
} = require('../controllers/dashboardController');


router.get('/',isAuthenticated, dashBoardGetController)
router.get('/create-profile',isAuthenticated,createProfileGetController)
router.post('/create-profile',isAuthenticated,createProfilePostController)

router.get('/edit-profile',isAuthenticated,editProfileGetController)
router.post('/edit-profile',isAuthenticated,editProfilePostController)

module.exports = router;