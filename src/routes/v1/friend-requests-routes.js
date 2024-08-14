const express = require('express');
const router = express.Router();
const {FriendRequestController} = require('../../controllers/index')
const friendRequestController = new FriendRequestController();

router.get('/search')
