const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planets = require("./planets.mongo");

function isHabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "data", "kepler_data.csv"))
      .pipe(parse({ comment: "#", columns: true }))
      .on("data",async (data) => {
        if (isHabitable(data)) {
          await savePlanet(data)
        }
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", async () => {
        console.log(`${(await getAllPlanets()).length} habitable planets found`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  const allPlanets = await planets.find({});
  return allPlanets;
}

async function savePlanet(data) {
  try {
    await planets.updateOne(
      {
        kepler_name: data.kepler_name,
      },
      {
        kepler_name: data.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  loadData,
  getAllPlanets,
};
