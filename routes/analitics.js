const express = require('express');

const analiticsControllers = require('../controllers/analitics');

const router = express.Router();

router.get('/overview', analiticsControllers.overview);
router.get('/analitics', analiticsControllers.analitics);

module.exports = router;