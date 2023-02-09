const { response } = require("express");
const mongoose = require("mongoose");
require("../Models/sharedData");
const mailschema = mongoose.model("SharedData");


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

module.exports = checkMail;
