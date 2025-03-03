const db = require("../models/queries");

async function trainersListGet(req, res) {
  const trainers = await db.getAllTrainers();
  res.render("trainers", { title: "Trainers Table", trainers: trainers });
}

async function trainerCreateGet(req, res) {
  res.render("trainerForm", { title: "Add Trainer", trainer: null });
}

async function trainerReadGet(req, res) {
  const { id } = req.params;
  try {
    const trainer = await db.getTrainerById(id);
    if (!trainer) {
      return res.status(404).send("Trainer Id not found.");
    }
    const pokemons = await db.getPokemonsByTrainer(id);
    res.render("trainerForm", {
      title: "Trainer Details",
      trainer,
      pokemons,
    });
  } catch (error) {
    console.error("Error fetching trainer details:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function trainerSavePost(req, res) {
  const { id, name } = req.body;

  if (!name) {
    return res.status(400).send("Trainer Name is required.");
  }
  try {
    if (id) {
      await db.updateTrainer(id, name);
    } else {
      await db.createTrainer(name);
    }
    res.redirect("/trainers");
  } catch (error) {
    console.error("Error saving Trainer:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function trainerDeletePost(req, res) {
  const { id } = req.body;
  try {
    await db.deleteTrainer(id);
    res.redirect("/trainers");
  } catch (error) {
    console.error("Error deleting Trainer:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  trainersListGet,
  trainerCreateGet,
  trainerReadGet,
  trainerSavePost,
  trainerDeletePost,
};
