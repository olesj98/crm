const express = require('express');
const passport = require('passport');

const categoryControllers = require('../controllers/category');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), categoryControllers.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), categoryControllers.getById);
router.delete('/:id', passport.authenticate('jwt', { session: false }), categoryControllers.remove);
// image - nazwa zawantazujemoi zminnoji w formdata (file/multipatr data) [image: file] -> [formdatakey: data]
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), categoryControllers.create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), categoryControllers.update);

module.exports = router;