//loginRouter.js
const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

// /api/auth/login
router.post('/login', loginController.login);
router.post('/test', loginController.test);
module.exports = router;
