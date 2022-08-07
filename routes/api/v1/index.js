const express = require('express');
const router = express.Router();


router.use('/song-list', require('./song_list'));

module.exports = router;