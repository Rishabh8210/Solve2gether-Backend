const express = require('express')
const UserRoutes = require('./user-routes')
const router = express.Router();
const { AuthController } = require('../../controllers/index')
const { validateUserAuthSignup, validateUserAuthSignin } = require('../../middlewares/index')

const authController = new AuthController()

router.use('/users', UserRoutes)
router.post('/signup', validateUserAuthSignup, authController.signup);
router.post('/signin', validateUserAuthSignin, authController.signin);
module.exports = router;