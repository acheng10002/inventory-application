require("dotenv").config();

const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("koyeb")
    ? { rejectUnauthorized: false }
    : false,
  /*
  host: "localhost",
  user: "amycheng",
  database: "pokemon_management",
  password: "q",
  port: 5432,
  */
});
