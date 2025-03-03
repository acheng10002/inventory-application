const pool = require("../db/pool");

async function getAllPokemons() {
  const { rows } = await pool.query(
    `SELECT 
        Pokemons.name, 
        Pokemons.id, 
        Pokemons.type_id,
        Types.name AS type_name,
        Pokemons.level,
        Pokemons.trainer_id,
        Trainers.name AS trainer_name
    FROM Pokemons 
    JOIN Types ON Pokemons.type_id = Types.id
    JOIN Trainers ON Pokemons.trainer_id = Trainers.id
    ORDER BY Pokemons.id ASC
    `
  );
  return rows;
}

async function getAllTrainers() {
  const { rows } = await pool.query(
    "SELECT name, id FROM Trainers ORDER BY id ASC"
  );
  return rows;
}

async function getAllTypes() {
  const { rows } = await pool.query(
    "SELECT name, id FROM Types ORDER BY id ASC"
  );
  return rows;
}

async function getPokemonById(id) {
  const { rows } = await pool.query(
    "SELECT name, id, type_id, level, trainer_id FROM Pokemons WHERE id = $1",
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
}

async function updatePokemon(id, name, type_id, level, trainer_id) {
  const result = await pool.query(
    `UPDATE Pokemons
        SET 
            name = $1,
            type_id = $2,
            level = $3,
            trainer_id = $4
        WHERE id = $5;`,
    [name, type_id, level, trainer_id, id]
  );
  return result.rowCount > 0;
}

async function createPokemon(name, type_id, level, trainer_id) {
  const result = await pool.query(
    `INSERT INTO Pokemons (name, type_id, level, trainer_id) 
    VALUES ($1, $2, $3, $4)
    RETURNING id;`,
    [name, type_id, level, trainer_id]
  );
  return result.rows[0].id;
}

async function deletePokemon(id) {
  const result = await pool.query(
    `DELETE FROM Pokemons 
      WHERE id = $1;`,
    [id]
  );
  return result.rowCount > 0;
}

async function getTrainerById(id) {
  const { rows } = await pool.query(
    "SELECT name, id FROM Trainers WHERE id = $1",
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
}

async function getPokemonsByTrainer(trainer_id) {
  const { rows } = await pool.query(
    `SELECT Pokemons.name 
        FROM Pokemons 
        WHERE Pokemons.trainer_id = $1
        ORDER BY Pokemons.name ASC;`,
    [trainer_id]
  );
  return rows;
}

async function updateTrainer(id, name) {
  const result = await pool.query(
    `UPDATE Trainers
    SET name = $1
    WHERE id = $2
    RETURNING id;`,
    [name, id]
  );
  return result.rowCount > 0;
}

async function createTrainer(name) {
  const result = await pool.query(
    `INSERT INTO Trainers (name) 
    VALUES ($1)
    RETURNING id;`,
    [name]
  );
  return result.rows[0].id;
}

async function deleteTrainer(id) {
  const result = await pool.query(
    `DELETE FROM Trainers 
        WHERE id = $1;`,
    [id]
  );
  return result.rowCount > 0;
}

async function getTypeById(id) {
  const { rows } = await pool.query(
    "SELECT name, id FROM Types WHERE id = $1",
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
}

async function getPokemonsByType(type_id) {
  const { rows } = await pool.query(
    `SELECT Pokemons.name 
            FROM Pokemons 
            WHERE Pokemons.type_id = $1
            ORDER BY Pokemons.name ASC;`,
    [type_id]
  );
  return rows;
}

module.exports = {
  getAllPokemons,
  getAllTrainers,
  getAllTypes,
  getPokemonById,
  updatePokemon,
  createPokemon,
  deletePokemon,
  getTrainerById,
  getPokemonsByTrainer,
  updateTrainer,
  createTrainer,
  deleteTrainer,
  getTypeById,
  getPokemonsByType,
};
