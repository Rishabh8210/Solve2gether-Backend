import express from 'express'
const router = express.Router();

import { UserController } from '../../controllers/index'
import {isAuthenticated} from '../../middlewares/index'
const userController = new UserController()

router.get('/profile', isAuthenticated,userController.getUserByUsername);
router.patch('/:username', isAuthenticated, userController.update);
router.delete('/', isAuthenticated, userController.deleteUserByUsername);

export default router;