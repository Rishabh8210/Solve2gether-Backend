const express = require('express')
const UserRoutes = require('./user-routes')
const router = express.Router();
const { AuthController } = require('../../controllers/index')
const { validateUserAuthSignup } = require('../../middlewares/index')

const authController = new AuthController()

router.use('/users', UserRoutes)
router.post('/signup', validateUserAuthSignup, authController.signup);
module.exports = router;