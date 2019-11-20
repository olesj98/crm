const express = require('express');
const passport = require('passport');

const positionControllers = require('../controllers/position');

const router = express.Router();

router.get('/:category', passport.authenticate('jwt', { session: false }), positionControllers.getByCategory);
router.delete('/:id', passport.authenticate('jwt', { session: false }), positionControllers.remove);
router.post('/', passport.authenticate('jwt', { session: false }), positionControllers.create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), positionControllers.update);

module.exports = router;