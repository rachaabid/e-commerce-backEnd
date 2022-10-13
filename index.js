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

const customerAPI = require('./routes/customerAPI');
const productAPI = require('./routes/productAPI');
const categoryAPI = require('./routes/categoryAPI');
const commandeAPI = require('./routes/commandeAPI');

app.use('/api/v1', customerAPI);
app.use('/api/v1', productAPI);
app.use('/api/v1', categoryAPI);
app.use('/api/v1', commandeAPI);

app.listen(process.env.port || 3000, function(){
  console.log('now listening for requests');
})
