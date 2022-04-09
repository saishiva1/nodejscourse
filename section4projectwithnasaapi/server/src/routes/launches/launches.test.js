const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../../services/mongo");

describe("Launches api", () => {
  beforeAll(() => {
    setTimeout(async () => {
      await mongoConnect();
    }, 10000);
  });

  afterAll(async () => {
    setTimeout(async () => {
      await mongoDisconnect();
    }, 10000);
  });

  describe("get /launches", () => {
    test("it should respond with 200 success", async () => {
      setTimeout(async () => {
        const response = await request(app).get("/launches").expect(200);
      }, 10000);
    });
  });

  describe("post /launches", () => {
    test("should respond with 201 success", async () => {
      const launchDataBeforeRequest = {
        mission: "uss en",
        rocket: "nccdokcd",
        target: "keplej",
        launchDate: "Jan 14,2022",
      };
      const launchDataAfterRequest = {
        mission: "uss en",
        rocket: "nccdokcd",
        target: "keplej",
        launchDate: `${new Date("Jan 14,2022").toISOString()}`,
      };
      setTimeout(async () => {
        const response = await request(app)
          .post("/launches")
          .send(launchDataBeforeRequest)
          .expect(201);

        expect(response.body).toMatchObject(launchDataAfterRequest);
      }, 10000);
    });

    test("should catch missing properties", async () => {
      const launchDataBeforeRequest = {
        mission: "uss en",
        rocket: "nccdokcd",
        target: "keplej",
      };
      const response = await request(app)
        .post("/launches")
        .send(launchDataBeforeRequest)
        .expect(400);

      expect(response.body).toStrictEqual({ error: "missing properties" });
    });

    test("should catch Invalid Date", async () => {
      const launchDataBeforeRequest = {
        mission: "uss en",
        rocket: "nccdokcd",
        target: "keplej",
        launchDate: "Jan vb",
      };
      const response = await request(app)
        .post("/launches")
        .send(launchDataBeforeRequest)
        .expect(400);

      expect(response.body).toStrictEqual({ error: "invalid date" });
    });
  });
});
