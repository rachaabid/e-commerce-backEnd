const nodemailer = require('nodemailer');
const path = require('path');
const fs  = require('fs');
const handlebars = require('handlebars');


exports.sendEmail = async(email, subject, payload, template)=>{
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = ()=>{
      return {
        from:`${process.env.email}`,
        to: email,
        subject: subject,
        html: compiledTemplate(payload)
      }
    };
    transporter.sendMail(options(), (error, info)=>{
      if (error){
        return error;
      }
      else {
        return res.status(200).json({success: true});
      }
    });
  } catch (error) {
    return error;
  }
}