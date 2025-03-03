const { Router } = require("express");

const pokemonsRouter = Router();

const pokemonsController = require("../controllers/pokemonsController");

// displays all pokemons
pokemonsRouter.get("/pokemons", pokemonsController.pokemonsListGet);

// displays new pokemon form
pokemonsRouter.get("/pokemons/new", pokemonsController.pokemonCreateGet);

// displays a pokemon's details in pokemon form
pokemonsRouter.get("/pokemons/:id", pokemonsController.pokemonReadGet);

// submits new pokemon form
pokemonsRouter.post("/pokemons/new", pokemonsController.pokemonSavePost);

// updates a pokemon's details
pokemonsRouter.post("/pokemons/:id", pokemonsController.pokemonSavePost);

// deletes a pokemon
pokemonsRouter.post(
  "/pokemons/:id/delete",
  pokemonsController.pokemonDeletePost
);

module.exports = pokemonsRouter;
