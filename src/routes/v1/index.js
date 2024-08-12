const express = require('express')
const UserRoutes = require('./user-routes')
const router = express.Router();
const { UserController } = require('../../controllers/index')
const userController = new UserController()

router.use('/users', UserRoutes)
router.post('/signup', userController.create);
module.exports = router;