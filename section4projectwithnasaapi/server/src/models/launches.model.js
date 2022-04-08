const launches = new Map();
let latestFlightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: "kelper mission 1",
  rocket: "Explorer one",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-1410 b",
  customer: ["ZMN", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchById(id){
  return launches.has(+id);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customer: ["ZMN", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchByFlightNumber(flightNumber){
  const aborted=launches.get(+flightNumber);
  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunch,
  abortLaunchByFlightNumber,
  existsLaunchById
};
