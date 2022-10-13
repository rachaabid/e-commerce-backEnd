const express = require('express');
const router = express.Router();
const passport = require('passport');

const { create, getCommandes, getCommandeById, pullById, update, deleteCommande } = require('../controlers/Commande');

router.post('/Commandes', 
passport.authenticate('bearer', { session: false }), 
create);

router.get('/Commandes', 
passport.authenticate('bearer', { session: false }), 
getCommandes);

router.get('/Commandes/:idCommande', 
passport.authenticate('bearer', { session: false }), 
getCommandeById);

router.put('/Commandes/:idCommande',
passport.authenticate('bearer', { session: false }), 
pullById);

router.put('/Commandes/:idCommande',
passport.authenticate('bearer', { session: false }), 
update);

router.delete('/Commandes/:idCommande',
passport.authenticate('bearer', { session: false }), 
deleteCommande);


module.exports = router;