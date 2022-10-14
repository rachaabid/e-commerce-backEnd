const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const Token = require('../models/token');


exports.signup = async (req, res)=>{
  try {
   const userFound = await User.findOne({ 
    email: req.body.email
   })
   if (userFound){
    return res.send({message: 'The email is already in use'});
   }
   else {
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    await User.create(req.body);
    res.json({message: 'Signup successfully'})
   }
  } catch (error) {
    res.status(500).json({
      message: error.message || 'some error occured'
    });
  }
}

exports.signin = async (req, res)=>{
  try {
    const userFound = await User.findOne({email: req.body.email});
    if (!userFound){
      return res.status(400).send({message: 'Mail or password is invalid'})
    }
    res.status(200).send({
      message: 'Logged in successfully',
      token: jwt.sign(
        {
          userId: userFound._id, role: userFound.role
        },
        process.env.SECRET_KEY,
        { expiresIn: 900 }
      )
    })
  } catch (error) {
    res.status(500).json({
      message: error.message || 'some error occured'
    }); 
  }
}


exports.forgetPassword = async (re, res)=>{
  try {
   const userFound = await User.findOne({
    email: req.body.email
   });
   if (!userFound) {
    res.status(404).send({message: 'User does not exist'});
   }
   let token = await Token.findOne({
    userId: userFound._id
   })
   if (token){
    await token.deleteOne();
   }
   const resetToken = randomString.generate(30);
   await new Token({
    userId: userFound._id,
    token: resetToken
   }).save();

   const link = `${process.env.url}#/resetPassword/${resetToken}/${userFound._id} `;

   await sendEmail(req.body.email, "Password Reset Request", {firstName: userFound.firstName, link: link,}, "../template/forgetPassword.html")
   res.json({message: 'Email sent'})
  } catch (error) {
    res.status(500).json({
      message: error.message || 'some error occured'
    });   
  }
}

exports.resetPassword = async (req, res)=>{
  try {
    const passwordResetToken = await Token.findOne({token: req.params.resetToken});
    if(!passwordResetToken){
     res.status(400).json('Invalid or expired password reset token'); 
    }
    const dateNow = new Date();
    const tokenDate = new Date(passwordResetToken.createdAt);
    const diff = dateNow - tokenDate;
    const seconds = Math.floor(diff / 1000);

    if (seconds > 900) {
      res.status(400).json('Invalid or expired password reset token');
    }
    let salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    await User.updateOne(
      {_id: passwordResetToken.userId},
      {$set: {password: hash}},
      {new: true}
    );
    const user = await User.findById(passwordResetToken.userId);
    await sendEmail(user.email, "Password Reset Successfully", 
    {firstName: user.firstName,}, "../template/resetPassword.html");
    await passwordResetToken.deleteOne();
    res.json({message: 'Password reset'});

  } catch (error) {
    res.status(500).json({
      message: error.message || 'some error occured'
    }); 
  }
}