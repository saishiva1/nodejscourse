const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunches,
  httpAbbortLaunch,
} = require("./launches.controller");
const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunches);
launchesRouter.delete("/:id", httpAbbortLaunch);

module.exports = launchesRouter;
