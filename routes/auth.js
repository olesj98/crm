const express = require('express');

const authControllers = require('../controllers/auth');

const router = express.Router();

router.post('/login', authControllers.login);
router.post('/register', authControllers.register);
router.get('/users', authControllers.users);

module.exports = router;