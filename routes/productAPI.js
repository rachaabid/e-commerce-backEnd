const express = require('express');
const router = express.Router();
const passport = require('passport');

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    const folder = path.resolve('./uploads')
    cb(null, folder)
  },
  filename: (req,file, cb)=>{
    const fileExtension = path.extname(file.originalname)
    const filename = Date.now() + fileExtension
    cb(null, filename)
  }
})

function fileFilter(req, file, cb){
  const fileExtension = path.extname(file.originalname)
  const acceptedExtensions = ['.jpeg', '.jpg', '.gif', '.png']

  cb(null, acceptedExtensions.includes(fileExtension))
}

const upload = multer({ storage: storage, fileFilter: fileFilter});

const { create, getProducts, getProductsById, update, deleteProduct, getCategoriesforProduct } = require('../controlers/Product');

router.post('/Products', 
[passport.authenticate('bearer', {session: false}), upload.single('photo')],
create);

router.get('/Products', 
passport.authenticate('bearer', {session: false}), 
getProducts);

router.get('/Products/:idProduct', 
passport.authenticate('bearer', {session: false}), 
getProductsById);

router.get('/listCategories',
passport.authenticate('bearer', {session: false}), 
getCategoriesforProduct);

router.put('/Products/:idProduct',
[passport.authenticate('bearer', {session: false}), upload.single('photo')],
update);

router.delete('/Products/:idProduct', 
passport.authenticate('bearer', {session: false}), 
deleteProduct);



module.exports = router;

