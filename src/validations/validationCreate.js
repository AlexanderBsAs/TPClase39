const {body}=require("express-validator")
const path=require("path")
const fs=require("fs")
const db = require('../database/models')
const sequelize = db.sequelize;

let validacionCreate=[
    body("title")
    .isLength({min:5, max:15}).withMessage("Debe ser entre 5 y 15 caracteres")
    .custom((value,{req})=>{
    let pelicula= db.Movie.findOne(
    { where:{
        title:req.body.title
    }})  
       if(pelicula!=undefined){
        throw new Error("ese titulo ya existe")
       }
     else{
       return true
     }
                
     
    })
            
 

   
  ]
module.exports={validacionCreate}