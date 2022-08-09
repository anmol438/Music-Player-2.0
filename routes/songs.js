const express = require('express');
const router = express.Router();

const songs_controller = require('../controllers/songs_controller');

router.get('/playlist/:album', songs_controller.playlist);
router.post('/recently-played', songs_controller.post_recently_played);
router.get('/recently-played', songs_controller.get_recently_played);
router.post('/queued', songs_controller.post_queued);
router.get('/queued', songs_controller.get_queued);



module.exports = router;