const express = require('express');
const router = express.Router();

const { signup, signin, forgetPassword, resetPassword } = require('../controlers/Auth');

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/forgetPassword', forgetPassword);

router.post('/resetPassword/:resetToken', resetPassword);

// router.get('/logout', logOut);

module.exports = router;