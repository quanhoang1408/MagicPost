const authController = require('../controllers/auth.controller');
const router = require('express').Router();

router.post('/login', authController.Login);
router.get('/logout', authController.Logout);

module.exports = router;