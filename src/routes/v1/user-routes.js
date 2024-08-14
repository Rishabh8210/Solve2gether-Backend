const express = require('express');
const router = express.Router();

const { UserController } = require('../../controllers/index')
const {isAuthenticated} = require('../../middlewares/index')
const userController = new UserController()

router.get('/profile', isAuthenticated,userController.getUserByUsername);
router.patch('/:username', isAuthenticated, userController.update);
router.delete('/', isAuthenticated, userController.deleteUserByUsername);
module.exports = router;