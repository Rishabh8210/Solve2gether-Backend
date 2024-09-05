import express from 'express'
import UserRoutes from './user-routes'

const router = express.Router();
import { AuthController, FriendRequestController } from '../../controllers/index'
import { validateUserAuthSignup, validateUserAuthSignin, isAuthenticated } from '../../middlewares/index'

const authController = new AuthController()
const friendRequestController = new FriendRequestController();


// Users routes
router.use('/users', UserRoutes)

// Auth routes
router.post('/signup', validateUserAuthSignup, authController.signup);
router.post('/signin', validateUserAuthSignin, authController.signin);

// Friends and all routes
router.get('/search', isAuthenticated, friendRequestController.getAllByName);
router.post('/:username', isAuthenticated, friendRequestController.sendFriendRequest);
router.patch('/:username', isAuthenticated, friendRequestController.acceptFriendRequest);
router.patch('/admin/friends', isAuthenticated, friendRequestController.removeFriend);

export default router;