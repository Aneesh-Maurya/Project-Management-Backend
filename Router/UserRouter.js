const express=require('express')
const router= express.Router();
const userController = require('../Controller/userController');

// ===================  User Registration Route ============
router.post('/signup', userController.signupUser);
// ==================== User Login Route ====================
router.post('/login', userController.loginUser);

module.exports= router;