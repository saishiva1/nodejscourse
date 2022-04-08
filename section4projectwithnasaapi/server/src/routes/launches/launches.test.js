const request = require("supertest");
const app = require("../../app");

describe("get /launches", () => {
  test("it should respond with 200 success", async () => {
    const response = await request(app).get("/launches").expect(200);
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
    const response = await request(app)
      .post("/launches")
      .send(launchDataBeforeRequest)
      .expect(201);

    expect(response.body).toMatchObject(launchDataAfterRequest);
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

      expect(response.body).toStrictEqual({error:'missing properties'});
  });

  test("should catch Invalid Date",async () => {
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

      expect(response.body).toStrictEqual({error:'invalid date'});
  });
});
