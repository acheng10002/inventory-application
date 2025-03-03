const { Router } = require("express");

const trainersRouter = Router();

const trainersController = require("../controllers/trainersController");

// displays all trainers
trainersRouter.get("/trainers", trainersController.trainersListGet);

// displays new trainer form
trainersRouter.get("/trainers/new", trainersController.trainerCreateGet);

// displays a trainer's details in trainer form
trainersRouter.get("/trainers/:id", trainersController.trainerReadGet);

// submits new trainer form
trainersRouter.post("/trainers/new", trainersController.trainerSavePost);

// updates a trainer's details
trainersRouter.post("/trainers/:id", trainersController.trainerSavePost);

// deletes a trainer
trainersRouter.post(
  "/trainers/:id/delete",
  trainersController.trainerDeletePost
);

module.exports = trainersRouter;
