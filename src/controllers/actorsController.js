const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { release } = require('os');
const { validationResult } = require('express-validator');
const { error } = require('console');
const actor_movie = require('../database/models/actor_movie');


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

let actorsController={
    /////LISTADO DE ACTORES  ///////////////////
    actorsList:(req,res)=>{
        Actors.findAll()
        .then(resultado=>
            res.render("actorsList",{actors:resultado}))
    
    },
    //////////////DETALLE DE ACTOR////////////////
    actorDetail:(req,res)=>{
        Actors.findByPk(req.params.id)
        .then(resultado=>{
            res.render("actorDetail",{actor:resultado})
        })
    },

    ////////////// VISTA CREACION DE ACTOR /////////////////////
    actorAdd: (req,res)=>{
        Movies.findAll()
        .then(resultado=>{
            res.render("actorAdd",{allMovies:resultado})
        })
       
    },
    //////////POST CREACION DE ACTOR///////////////////
    actorCreate:(req,res)=>{
       const{first_name,last_name,rating,favorite_movie_id}=req.body

       Actors.create({
        first_name:first_name,
        last_name:last_name,
        rating:rating,
        favorite_movie_id:favorite_movie_id
       })

       .then(resultado=>{
        db.actor_movie.create({
            actor_id:resultado.id,
            movie_id:resultado.favorite_movie_id

        })
        .then(resultado=>{
             res.redirect("/actors")
        })
       
       })
       .catch(error=>{
        res.send(error)
       })
    },

    actorEdit:(req,res)=>{
        Actors.findByPk(req.params.id)
        .then(resultado=>{
            Movies.findAll()
            .then(pelicula=>{
                 res.render("actorEdit",{actor:resultado,movie:pelicula})
            })
            .catch(error=>{
                res.send(error)
            })
              
        })
        .catch(error=>{
           res.send(error) 
        })
     
    },
    actorUpdate:(req,res)=>{
        const{first_name,last_name,rating,favorite_movie_id}=req.body

        Actors.update({
            first_name:first_name,
            last_name:last_name,
            rating:rating,
            favorite_movie_id:favorite_movie_id
        },{
            where:{id:req.params.id}
        })
        .then(resultado=>{
            res.redirect("/actors")
        })
    },

    

    //////////////BORRADO DE ACTOR ////////////////


    actorDestroy:(req,res)=>{


    db.actor_movie.destroy({where:{
                actor_id:req.params.id
             }})
             .then(resultado=>{
     Actors.destroy({
            where:{
                id:req.params.id
            }
        })
         .then(resultado=>
            res.redirect("/actors"))

             })


            

        
         .catch(error=>{
                res.send(error)
            })
   
       
         
    }

}

module.exports=actorsController