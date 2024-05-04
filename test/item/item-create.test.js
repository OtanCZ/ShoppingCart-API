const request = require("supertest");
const app = require("../../app");

describe("creation of item test", () => {
  test("HDS", async() => {
    const response = await request(app).post("/item/create").send({
      "country": "EN",
      "name": "test name",
      "year": 2019
    });
    expect(response.body.country).toEqual("EN");
    expect(response.body.name).toEqual("test name");
    expect(response.body.year).toEqual(2019);
  });
});


