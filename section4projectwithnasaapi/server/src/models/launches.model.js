const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

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

const DEFAULT_FLGHT_NUMBER =100;

saveLaunch(launch);

async function saveLaunch(launch){
  const planet = await planets.find({kepler_name:launch.target});
  
  if(!planet){
    throw new Error('No planet found')
  }
  
  await launches.findOneAndUpdate({
    flightNumber: launch.flightNumber,
  },launch ,{upsert:true})
};

async function existsLaunchById(id){
  return await launches.findOne({flightNumber:+id});
}

async function getAllLaunches() {
  return await launches.find({},{'__id':0,'__v':0});
}

async function getLatestFlightNumber(){
  const latestLaunch = await launches.findOne().sort('-flightNumber');
  if(!latestLaunch){
    return DEFAULT_FLGHT_NUMBER;
  }
  return latestLaunch.flightNumber + 1;
}

async function addNewLaunch(launch) {
  const flightNumber=await getLatestFlightNumber();
  await saveLaunch(Object.assign(launch, {
    flightNumber,
    customer: ["ZMN", "NASA"]
  }));
}

async function abortLaunchByFlightNumber(flightNumber){
  const aborted= await launches.updateOne({flightNumber:+flightNumber},{upcoming:false,success:false});
  console.log(aborted)
  return aborted.modifiedCount===1;
}

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunch,
  abortLaunchByFlightNumber,
  existsLaunchById
};
