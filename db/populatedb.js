// const { Client } = require("pg");
require("dotenv").config();
const pool = require("./pool");

/* each pokemon must be contained in a type
a trainer can have multiple pokemons */
const SQL = `
    CREATE TABLE IF NOT EXISTS Trainers (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(50) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS Types (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(50) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS Pokemons (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(50) NOT NULL,
        level INTEGER CHECK ((level >= 1) AND (level <= 100)) DEFAULT 1,
        type_id INTEGER NOT NULL,
        trainer_id INTEGER NOT NULL,
        FOREIGN KEY (type_id) REFERENCES Types(id) ON DELETE CASCADE,
        FOREIGN KEY (trainer_id) REFERENCES Trainers(id) ON DELETE CASCADE,
        UNIQUE (name, trainer_id)
    );

    WITH duplicate_rows AS (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY id) AS row_num
        FROM Trainers
    )
    DELETE FROM Trainers WHERE id IN (SELECT id FROM duplicate_rows WHERE row_num > 1);

    WITH duplicate_rows AS (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY id) AS row_num
        FROM Types
    )
    DELETE FROM Types WHERE id IN (SELECT id FROM duplicate_rows WHERE row_num > 1);

    WITH duplicate_rows AS (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY name, trainer_id ORDER BY id) AS row_num
        FROM Pokemons
    )
    DELETE FROM Pokemons WHERE id IN (SELECT id FROM duplicate_rows WHERE row_num > 1);

    DO $$ 
    BEGIN 
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'unique_trainer_name'
        ) THEN 
            ALTER TABLE Trainers ADD CONSTRAINT unique_trainer_name UNIQUE (name);
        END IF;

        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'unique_type_name'
        ) THEN 
            ALTER TABLE Types ADD CONSTRAINT unique_type_name UNIQUE (name);
        END IF;

        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'unique_pokemon_per_trainer'
        ) THEN 
            ALTER TABLE Pokemons ADD CONSTRAINT unique_pokemon_per_trainer UNIQUE (name, trainer_id);
        END IF;
    END $$;

    INSERT INTO Trainers (name) VALUES
        ('Ash Ketchum'),
        ('Gary Oak'),
        ('Brock'),
        ('Misty'),
        ('Tracey Sketchit'),
        ('May'),
        ('Max'),
        ('Dawn'),
        ('Paul'),
        ('Barry'),
        ('Iris'),
        ('Cilan'),
        ('Serena'),
        ('Clemont'),
        ('Bonnie'),
        ('Gladion'),
        ('Lillie'),
        ('Goh'),
        ('Chloe Cerise'),
        ('Leon'),
        ('Hop')
    ON CONFLICT DO NOTHING;

    
    INSERT INTO Types (name) VALUES
        ('Fire'),
        ('Water'),
        ('Grass'),
        ('Electric'),
        ('Normal'),
        ('Psychic'),
        ('Fighting'),
        ('Bug'),
        ('Rock'),
        ('Ghost'),
        ('Dragon'),
        ('Dark'),
        ('Steel'),
        ('Fairy'),
        ('Poison'),
        ('Ground'),
        ('Ice')
    ON CONFLICT DO NOTHING;    

    INSERT INTO Pokemons (name, level, type_id, trainer_id) VALUES
        ('Pikachu', 88, 4, 1),
        ('Infernape', 80, 1, 1),
        ('Sceptile', 77, 3, 1),
        ('Kingler', 65, 2, 1),

        ('Blastoise', 84, 2, 2),
        ('Arcanine', 79, 1, 2),

        ('Onix', 74, 9, 3),
        ('Crobat', 70, 15, 3),
        ('Ludicolo', 72, 2, 3),

        ('Starmie', 68, 2, 4),
        ('Psyduck', 55, 2, 4),

        ('Scyther', 60, 8, 5),
        ('Marill', 50, 2, 5),

        ('Beautifly', 57, 8, 6),
        ('Wartortle', 60, 2, 6),

        ('Piplup', 55, 2, 8),
        ('Quilava', 52, 1, 8),

        ('Torterra', 85, 3, 9),
        ('Drapion', 80, 15, 9),

        ('Empoleon', 78, 2, 10),
        ('Roserade', 74, 3, 10),

        ('Haxorus', 85, 11, 11),
        ('Excadrill', 82, 16, 11),

        ('Pansage', 55, 3, 12),
        ('Stunfisk', 50, 16, 12),

        ('Sylveon', 60, 14, 13),
        ('Pancham', 58, 7, 13),

        ('Luxray', 72, 4, 14),
        ('Chespin', 50, 3, 14),

        ('Dedenne', 45, 4, 15),

        ('Lycanroc', 80, 9, 16),
        ('Umbreon', 78, 12, 16),

        ('Alolan Vulpix', 50, 17, 17),

        ('Suicune', 85, 2, 18),
        ('Grookey', 40, 3, 18),

        ('Eevee', 40, 5, 19),

        ('Dragapult', 82, 11, 20),
        ('Rillaboom', 78, 3, 20),

        ('Wooloo', 48, 5, 21)     
    ON CONFLICT DO NOTHING;          
`;

async function main() {
  console.log("seeding...");
  /* const client = new Client({
    connectionString:
      "postgresql://amycheng:q@localhost:5432/pokemon_management",
  }); */

  try {
    // await pool.connect();
    await pool.query(SQL);
    console.log("Database seeding complete.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await pool.end();
    console.log("done");
  }
}

main();
