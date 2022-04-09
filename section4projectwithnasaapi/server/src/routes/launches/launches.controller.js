const {
  getAllLaunches,
  addNewLaunch,
  abortLaunchByFlightNumber,
  existsLaunchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(Array.from(await getAllLaunches()));
}

async function httpAddNewLaunches(req, res) {
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

  await addNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbbortLaunch(req, res) {
  const launchId = req.params.id;

  if (!(await existsLaunchById(launchId))) {
    return res.status(404).json({
      error: "launch not found",
    });
  }

  const aborted = await abortLaunchByFlightNumber(launchId);
  
  if(!aborted){
    return res.status(200).json({
      error:'not aborted'
    })
  }
  return res.status(200).json({
    ok:true
  });

}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunches,
  httpAbbortLaunch,
};
