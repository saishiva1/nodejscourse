const {
  getAllLaunches,
  addNewLaunch,
  abortLaunchByFlightNumber,
  existsLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(Array.from(getAllLaunches()));
}

function httpAddNewLaunches(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ error: "missing properties" });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "invalid date" });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbbortLaunch(req, res) {
  const launchId = req.params.id;

  if (!existsLaunchById(launchId)) {
    return res.status(404).json({
      error: "launch not found",
    });
  }

  const aborted =  abortLaunchByFlightNumber(launchId);
  return res.status(200).json(aborted);

}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunches,
  httpAbbortLaunch,
};
