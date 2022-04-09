const app = require("./app");

const server = require("http").createServer(app);

const { loadData } = require("./models/planets.model");
const {mongoConnect} = require("../services/mongo");

async function startServer() {
  await mongoConnect();
  await loadData();

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
}

startServer();
