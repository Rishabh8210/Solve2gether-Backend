import express from 'express'
import UserRoutes from './user-routes'
import parseData from '../../controllers/question-controller';
import storage from '../../configs/multer-config';
import multer from 'multer';
const upload = multer({storage})
const router = express.Router();
import { AuthController, FriendRequestController, QuestionController } from '../../controllers/index'
import { validateUserAuthSignup, validateUserAuthSignin, isAuthenticated } from '../../middlewares/index'


const authController = new AuthController()
const friendRequestController = new FriendRequestController();
const questionController = new QuestionController();


// Users routes
router.use('/users', UserRoutes)

// Auth routes
router.post('/signup', validateUserAuthSignup, authController.signup);
router.post('/signin', validateUserAuthSignin, authController.signin);

// Friends and all routes
router.patch('/friends', isAuthenticated, friendRequestController.removeFriend);
router.get('/search', isAuthenticated, friendRequestController.getAllByName);
router.post('/uploads', upload.single('file'), questionController.parseData);
router.post('/:username', isAuthenticated, friendRequestController.sendFriendRequest);
router.patch('/:username', isAuthenticated, friendRequestController.acceptFriendRequest);

// Uploads files/questions


export default router;