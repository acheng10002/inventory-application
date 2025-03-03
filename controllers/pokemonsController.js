const db = require("../models/queries");

async function pokemonsListGet(req, res) {
  const pokemons = await db.getAllPokemons();
  res.render("pokemons", {
    title: "Pokemons Table",
    pokemons,
  });
}

async function pokemonCreateGet(req, res) {
  try {
    const trainers = await db.getAllTrainers();
    const types = await db.getAllTypes();
    res.render("pokemonForm", {
      title: "Add Pokemon",
      pokemon: null,
      types,
      trainers,
    });
  } catch (error) {
    console.error("Error fetching trainers/types:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function pokemonReadGet(req, res) {
  const { id } = req.params;
  try {
    const pokemon = await db.getPokemonById(id);
    if (!pokemon) {
      return res.status(404).send("Pokemon Id not found.");
    }

    const trainers = await db.getAllTrainers();
    const types = await db.getAllTypes();

    res.render("pokemonForm", {
      title: "Pokemon Details",
      pokemon,
      types,
      trainers,
    });
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function pokemonSavePost(req, res) {
  const { name, id, type_id, level, trainer_id } = req.body;

  if (!name || !type_id || !level || !trainer_id) {
    return res
      .status(400)
      .send("Name, Level, Type, and Trainer Fields are required.");
  }
  try {
    if (id) {
      await db.updatePokemon(id, name, type_id, level, trainer_id);
    } else {
      await db.createPokemon(name, type_id, level, trainer_id);
    }
    res.redirect("/pokemons");
  } catch (error) {
    console.error("Error saving Pokemon:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function pokemonDeletePost(req, res) {
  const { id } = req.body;
  try {
    await db.deletePokemon(id);
    res.redirect("/pokemons");
  } catch (error) {
    console.error("Error deleting Pokemon:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  pokemonsListGet,
  pokemonCreateGet,
  pokemonReadGet,
  pokemonSavePost,
  pokemonDeletePost,
};
