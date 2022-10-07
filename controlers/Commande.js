const Commande = require("../models/commande");
const Product = require("../models/product");

exports.create = async (req, res)=>{
  try {
    
    const commandCreated = await Commande.create(req.body);
    await Commande.findByIdAndUpdate(commandCreated._id, {$push: {listProducts: req.params.idProduct, associatedCustomer: req.user.customerId}}, {new: true});
    await Product.findByIdAndUpdate(req.params.idProduct, {$inc: {quantite: -1}}, {new: true});
    res.send({message: 'Command saved'})
  } catch (error) {
   res.status(500).send({
    message: error.message || 'Some error occured'
   }) 
  }
}

exports.getCommandes = async (req, res)=>{
  try {
    const commandes = await Commande.find().populate('listProducts');
    res.send(commandes);
  } catch (error) {
  res.status(500).send({
    message: error.message || 'Some error occured'
  })
  }
}

exports.getCommandeById = async (req, res)=>{
  try {
    const commande = await Commande.findById(req.params.idCommande);
  res.send(commande);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured' 
    })
  } 
}

exports.pullById = async (req, res)=>{
  try {
    await Commande.findByIdAndUpdate(req.params.idCommande, {$pull: {listProducts: req.params.idProduct, associatedCustomer: req.params.idCustomer}}, {new: true});
    res.send({message: 'Product desaffected'})
  } catch (error) {
    res.status(500).send({
      message: error.message ||'Some error occured'
    })
  }
}

exports.update = async (req, res)=>{
  try {
    await Commande.findByIdAndUpdate(req.params.idCommande, req.body);
    res.send({message: 'Commande updated'})
  } catch (error) {
    res.status(500).send({
      message: error.message ||'Some error occured'
    }) 
  }
}

exports.deleteCommande = async (req, res)=>{
  try {
    await Commande.findByIdAndRemove(req.params.idCommande);
    res.send({message: 'Commande deleted'})
  } catch (error) {
    res.status(500).send({
      message: error.message ||'Some error occured'
    }) 
  }
}