const express = require('express');
const router = express.Router();

const song_list_api = require('../../../controllers/api/v1/song_list_api');

router.get('/', song_list_api.song);



module.exports = router;