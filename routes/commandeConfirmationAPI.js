const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createCommandeConfirmation } = require('../Controlers/commandeConfirmation');

router.post('/commandeConfirmation/:idProduct',  
 passport.authenticate('bearer', {session: false}),
 createCommandeConfirmation);

 
module.exports = router;