const { response } = require("express");
const mongoose = require("mongoose");
require("../Models/sharedData");
const mailschema = mongoose.model("SharedData");

<<<<<<< HEAD

const checkMail= (req,res,next)=>{

if(req.body.email !=null)
{
    let addmail =new mailschema({
        email: req.body.email
    });
    addmail.save()
    .then((result)=>next())
    
    .catch((error) =>{
       res.status(201).json({message:"this email exists"})
next(error)    
    });
}
next()
   
   
}
=======
const checkMail = (req, res, next) => {
  if (req.body.email) {
    let addmail = new mailschema({
      email: req.body.email,
    });
    addmail
      .save()
      .then((result) => next())
      .catch((error) => {
        res.status(200).json({ message: "this email exists" });
        next(error);
      });
  } else {
    next();
  }
};
>>>>>>> 48d6373b2c9211396a36e1c1e59a4bf39a300044

module.exports = checkMail;
