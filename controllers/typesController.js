const db = require("../models/queries");

async function typesListGet(req, res) {
  const types = await db.getAllTypes();
  res.render("types", { title: "Types Table", types: types });
}

async function typePokemonsGet(req, res) {
  const { id } = req.params;
  try {
    const type = await db.getTypeById(id);
    if (!type) {
      return res.status(404).send("Type Id not found.");
    }

    const pokemons = await db.getPokemonsByType(id);
    res.render("typePokemons", {
      title: `Pokemons of ${type.name}-Type `,
      type,
      pokemons,
    });
  } catch (error) {
    console.error("Error fetching Pokemons for type:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  typesListGet,
  typePokemonsGet,
};
