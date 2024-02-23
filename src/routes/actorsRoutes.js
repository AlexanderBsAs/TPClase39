const express = require('express');
const router = express.Router();
const{actorDetail,actorsList,actorAdd,actorCreate, actorEdit, actorUpdate, actorDestroy}= require('../controllers/actorsController');
const {validacionCreate}=require("../validations/validationCreate")

///////////LISTADO DE ACTORES /////////////////////
router.get("/",actorsList)

////////// DETALLE DE ACTOR ////////////////////////
router.get("/detail/:id",actorDetail)


////////////CREACION DE ACTOR////////////////
router.get("/add",actorAdd)
router.post("/create",actorCreate)


///////////// EDICION DE ACTOR //////////////
router.get("/edit/:id",actorEdit)
router.put("/edit/:id",actorUpdate)


///////// ELIMINACION ACTOR ///////////////
router.delete("/delete/:id", actorDestroy)

module.exports=router