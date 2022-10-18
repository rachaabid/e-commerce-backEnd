const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createOrderConfirmation } = require('../Controlers/orderConfirmation');

router.post('/orderConfirmation/:idProduct',  
 passport.authenticate('bearer', {session: false}),
 createOrderConfirmation);

 
module.exports = router;