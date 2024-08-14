const express = require('express')
const UserRoutes = require('./user-routes')
const router = express.Router();
const { AuthController, FriendRequestController } = require('../../controllers/index')
const { validateUserAuthSignup, validateUserAuthSignin, isAuthenticated } = require('../../middlewares/index')

const authController = new AuthController()
const friendRequestController = new FriendRequestController();


// Users routes
router.use('/users', UserRoutes)

// Auth routes
router.post('/signup', validateUserAuthSignup, authController.signup);
router.post('/signin', validateUserAuthSignin, authController.signin);

// Friends and all routes
router.get('/search', isAuthenticated, friendRequestController.getAllByName);
module.exports = router;