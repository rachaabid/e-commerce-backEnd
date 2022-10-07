const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  nameProduct: {
    type: String,
    required: [true, 'Name Product is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  quantite: {
    type: Number,
    required: [true, 'Quantite is required']
  },
  sellingPrice: {
    type: String, 
    required: [true, 'Selling Price is required']
  },
  photo: {
    type: String,
    default: 'https://i.imgur.com/I65uxQr.png'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  }
},
{
  versionKey: false,
  timestamps: true
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;