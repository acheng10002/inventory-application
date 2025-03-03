const { Router } = require("express");

const typesRouter = Router();

const typesController = require("../controllers/typesController");

// displays all types
typesRouter.get("/types", typesController.typesListGet);

// retrieves all pokemons of a type
typesRouter.get("/types/:id/pokemons", typesController.typePokemonsGet);

module.exports = typesRouter;
