const express = require('express');
const router = express.Router();
const passport = require('passport');

const users_controller = require('../controllers/users_controller');

router.get('/profile', passport.check_auth, users_controller.profile);
router.get('/sign-in', users_controller.sign_in);
router.get('/sign-up', users_controller.sign_up);

router.post('/create', users_controller.create);
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect: '/users/sign-in',
        failureMessage: true
    }
), users_controller.create_session);
router.get('/sign-out', users_controller.destroy_session);

router.use('/api', require('./api'));

router.use('/songs', require('./songs'));


module.exports = router;