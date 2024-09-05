import express from 'express';
const router = express.Router();
import {FriendRequestController} from '../../controllers/index'
const friendRequestController = new FriendRequestController();

router.get('/search')

export default router