const ItemMongo = require("../database/item-mongo");

class ItemModel {

  constructor() {
  }

  async createItem(doc) {
    //TODO místo pro logiku commandu - validace vstupů, business logika commandu, atp.
    return await ItemMongo.createItem(doc);
  }

  async updateItem(id, doc) {
    //TODO místo pro logiku commandu - validace vstupů, business logika commandu, atp.
    return await ItemMongo.updateItem(id, doc);
  }

  async getItem(id) {
    //TODO místo pro logiku commandu - validace vstupů, business logika commandu, atp.
    return await ItemMongo.getItem(id);
  }

  async listItems() {
    //TODO místo pro logiku commandu - validace vstupů, business logika commandu, atp.
    return await ItemMongo.listItem();
  }

  async deleteItem(id) {
    //TODO místo pro logiku commandu - validace vstupů, business logika commandu, atp.
    return await ItemMongo.deleteItem(id);
  }
}

module.exports = new ItemModel();
