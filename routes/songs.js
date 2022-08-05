const express = require('express');
const router = express.Router();

const songs_controller = require('../controllers/songs_controller');

router.get('/playlist', songs_controller.playlist);


module.exports = router;