const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hii, I am a new User');
})

module.exports = router;