const ItemMongo = require('../../database/item-mongo');
const request = require("supertest");
const app = require("../../app");

// Mock the methods
jest.mock('../../database/item-mongo', () => {
  return {
    createItem: jest.fn()
  };
});

describe('Test mocked method', () => {
  test('Mock method from database', async() => {
    ItemMongo.createItem.mockReturnValue({
      "name": "test name",
      "country": "EN",
      "year": 2019,
      "_id": "6613ea47f93e3269d1de0dd7",
      "__v": 0
    });

    const response = await request(app).post("/item/create").send({
      "country": "EN",
      "name": "test name",
      "year": 2019
    });
    expect(response.body.country).toEqual("EN");
    expect(response.body.name).toEqual("test name");
    expect(response.body.year).toEqual(2019);
    expect(ItemMongo.createItem).toHaveBeenCalled();
  });

});