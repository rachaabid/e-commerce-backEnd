const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommandeSchema = new Schema({
  totalSellingPrice: {
    type: String,
    required: [true, 'Total Selling Price is required']
  },
  email: {
    type: String,
    
  },
  adress: {
    type: String,
    required: [true, 'Adress is required']
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Phone Number is required']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment Method is required']
  },
  listProducts: [{type: mongoose.Schema.Types.ObjectId, ref: 'product'}],
  associatedCustomer: {type: mongoose.Schema.Types.ObjectId, ref: 'customer'}
},
{
  versionKey: false,
  timestamps: true
});

const Commande = mongoose.model('commande', CommandeSchema);

module.exports = Commande;