const express = require('express');
const router = express.Router();

const { UserController } = require('../../controllers/index')
const userController = new UserController()

router.get('/', userController.getUserByUsername);
router.put('/:username', userController.update);
module.exports = router;