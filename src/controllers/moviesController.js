const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { release } = require('os');
const { validationResult } = require('express-validator');
const { error } = require('console');


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll(
            {include:[{association:"generos"},{association:"actores"}]}
        )
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        Genres.findAll()
        .then(resultado=>{
             res.render("moviesAdd",{allGenres:resultado})
        })
       
    },
    create: function (req,res) {
        const {title,rating,awards,release_date,length,genre_id}=req.body
        let error=validationResult(req)

        if(error.isEmpty()){
             Movies.create({
            title:title,
            rating:rating,
            awards:awards,
            release_date:release_date,
            length:length,
            genre_id:genre_id

        })
        .then(resultado=>{
            res.redirect("/movies")
        })
        .catch(error=>{
        res.send(error)})
        }
       

        else{
            Genres.findAll()
            .then(resultado=>{
                 res.render("moviesAdd",{allGenres:resultado,errors:error.array(), old:req.body, title: "registro"})
            })
        
        }
        
    },
    edit: function(req,res) {
        let id=req.params.id      
        let generos=  
        Movies.findByPk(id)
        .then(Movie=>{
     Genres.findAll()
            .then(allGenres=>{
    res.render("moviesEdit",{Movie,allGenres})
            })
            .catch(error=>{
                res.send(error)
            })
            
        })
        .catch(error=>{
            res.send(error)
        })

    },
    update: function (req,res) {
        let error=validationResult(req)
        const {title,rating,awards,release_date,length,genre_id}=req.body
        if(error.isEmpty()){
            Movies.update({
            title,
            rating,
            awards,
            release_date,
            length,
            genre_id
        },{
            where:{id:req.params.id}
        })
        .then(resultado=>{
            res.redirect("/movies")
        })
        .catch(error=>{
            res.send(error)
        })
        }
        else{
            Movies.findByPk(req.params.id)
            .then(Movie=>{
            Genres.findAll()
                .then(allGenres=>{
        res.render("moviesEdit",{Movie,allGenres,errors:error.array(), old:req.body,})
                })
                .catch(error=>{
                    res.send(error)
                })
                
            })
            .catch(error=>{
                res.send(error)
            })
    
        }
       

    },
    delete: function (req,res) {
        Movies.findByPk(req.params.id)
        .then(resultado=>{
             res.render("moviesDelete",{Movie:resultado})
        })
        .catch(error=>{
            res.send(error)
        })
       

    },
    destroy: function (req,res) {
    let pelicula= Movies.findByPk(req.params.id,{
        include:[{association:"generos"},{association:"actores"}]
     })
    Movies.destroy({
        where:{where}
    })
    .then(resultado=>{
        res.redirect("/actors")
    })
    .catch(error=>{
        res.send(error)
    })
    }
}

module.exports = moviesController;