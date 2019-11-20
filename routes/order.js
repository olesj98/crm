const express = require('express');
const passport = require('passport');

const orderControllers = require('../controllers/order');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), orderControllers.getAll);
router.post('/', passport.authenticate('jwt', { session: false }), orderControllers.create);

module.exports = router;