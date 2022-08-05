const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users_controller');

router.get('/profile', users_controller.profile);
router.get('/sign-in', users_controller.sign_in);
router.get('/sign-up', users_controller.sign_up);

router.post('/create', users_controller.create);
router.post('/create-session', users_controller.create_session);


module.exports = router;