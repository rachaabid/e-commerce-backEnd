const passport = require('passport');
const bearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');

passport.use(new bearerStrategy(
  (token, done)=>{
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const customerFound = Customer.findById(decodedToken.customerId, (err, customer)=>{
      if(err){
        return done(err);
      }
      if(!customer){
        return done(null, false)
      }
      return done(null, customer, {scope: 'all'})
    })
  }
));