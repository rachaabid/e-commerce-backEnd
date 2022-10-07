const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  nameCategory: {
    type: String,
    required: [true, 'Name Category is required']
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'product'
    }
  ]
},
{
  versionKey: false,
  timestamps: true
});

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;