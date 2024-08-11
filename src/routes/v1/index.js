const express = require('express')
const UserRoutes = require('./user-routes')
const router = express.Router();

router.use('/users', UserRoutes)

module.exports = router;