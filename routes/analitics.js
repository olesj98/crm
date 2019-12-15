const express = require('express');
const passport = require('passport');

const analiticsControllers = require('../controllers/analitics');

const router = express.Router();

router.get('/overview', passport.authenticate('jwt', { session: false }), analiticsControllers.overview);
router.get('/analitics', passport.authenticate('jwt', { session: false }), analiticsControllers.analitics);

module.exports = router;