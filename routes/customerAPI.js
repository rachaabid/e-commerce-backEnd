const express = require('express');
const router = express.Router();
const passport = require('passport');

const { create, getCustomers, getCustomerById, update, deleteCustomer } = require('../controlers/Customer');

router.post('/Customers', 
passport.authenticate('bearer', {session: false}), 
create);

router.get('Customers', 
passport.authenticate('bearer', {session: false}), 
getCustomers);

router.get('Customers/:idCustomer',
passport.authenticate('bearer', {session: false}), 
getCustomerById);

router.put('Customers/:idCustomer',
passport.authenticate('bearer', {session: false}), 
update);

router.delete('Customers/:idCustomer', 
passport.authenticate('bearer', {session: false}), 
deleteCustomer);


module.exports = router;