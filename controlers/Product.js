const Product = require('../models/product');
const Category = require('../models/category');

exports.create = async (req, res)=>{
  try {
    if (req.body.photo == '') {
      req.body.photo = 'https://i.imgur.com/I65uxQr.png'
    }
   const product = await Product.create(req.body);
   await Category.findByIdAndUpdate(req.body.category, {$push: {products: product._id}}, {new: true});
    res.send({message: 'Product saved'})
  } catch (error) {
    res.status(500).send({
      message: error.message ||'Some error occured'
    })
  }
}

exports.getProducts = async (req, res)=>{
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send({
      message: error.message ||'Some error occured'
    }) 
  }
}

exports.getProductsById = async (req, res)=>{
  try {
    const product = await Product.findById(req.params.idProduct);
    res.send(product);
  } catch (error) {
    res.status(500).send({
      message: error.message ||'Some error occured'
    }) 
  }
}

exports.getCategoriesforProduct = async (req, res)=>{
  try {
    const categories = await Category.find();
    listCategories = [];
    categories.map(category => {
      listCategories.push({label: category.nameCategory, value: category._id})
    })
    res.send(listCategories);
  } catch (error) {
    res.status(500).send({
      message: error.message ||'Some error occured'
    })  
  }
}

exports.update = async (req, res)=>{
  try {
    await Product.findByIdAndUpdate(req.params.idProduct, req.body);
    res.send({message: 'Product updated'})
  } catch (error) {
    res.status(500).send({
      message: error.message ||'Some error occured'
    })
  }
}

exports.delete = async (req, res)=>{
  try {
    await Category.findByIdAndUpdate(req.body.category, {$pull: {products: req.params.idProduct}}, {new: true});
    await Product.findByIdAndRemove(req.params.idProduct);
    res.send({message: 'Product deleted'})
  } catch (error) {
    res.status(500).send({
      message: error.message ||'Some error occured'
    }) 
  }
}
