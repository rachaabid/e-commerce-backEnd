const Product = require('../models/product');
const Commande = require('../models/commande');
const pdf = require('pdf-creator-node');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const nodemailer = require('nodemailer');

exports.createOrderConfirmation = async(req, res)=>{
  try {
    const product = await Product.findById(req.params.idProduct);
    if (product.quantite !== 0){
      const commande  = await Commande.create(req.body);
      var templateCommande = fs.readFileSync(filePath, {encoding: 'utf-8'});
      options = {
        customer: req.body.associatedCustomer,
        email: req.body.email,
        adress: req.body.adress,
        phoneNumber: req.body.phoneNumber,
        listProducts: req.body.listProducts,
        totalSellingPrice: req.body.totalSellingPrice,
        paymentMethod: req.body.paymentMethod
      }
      const render = ejs.render(templateCommande, options);

      var document = {
        html: render,
        data: {
          users: commande
        },
        path: path.resolve(`./confirmed orders/${commande._id}.pdf`)
      };
      var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm"
      }

      pdf
        .create(document, options)
        .then((res) => {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.email,
              pass: process.env.password,
            },
          });

          let info = ({
              from: '"RACHA" <req.body.email>',
              to: "rachabnabid@gmail.com",
              subject: "Commande",
              html: render,
              attachments: [
                {
                  filename: 'commande.pdf',
                  content: fs.createReadStream(res.filename)
                }],
            });
          transporter.sendMail(info);
        });
        await Product.findByIdAndUpdate(req.params.idProduct, {$inc: {quantite: -1}}, {new: true});
        res.json({message: 'Order confirmed'})
    }
    else {
      res.status(400).json({message: 'Empty stock'})
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}