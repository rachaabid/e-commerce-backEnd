const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/e-commerce').then(()=>{
  console.log('successfully connect to database');
}).catch((err)=>{
console.log(err);
console.log('not connected to database');
})