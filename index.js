const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
require('./passport-strategies/bearer')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

require('./db/connect');
require('dotenv').config();

app.listen(process.env.port || 3000, function(){
  console.log('now listening for requests');
})
