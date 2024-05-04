const mongoose = require('mongoose');

//Připojení k DB - connection string s přímým připojením do databáze s názvem UHK
mongoose.connect('mongodb://localhost:27017/UHK', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Definice schématu (collection), která se při neexistenci vytvoří v připojené databázi
const Schema = mongoose.Schema;
const itemSchema = new Schema({
  name: String,
  country: String,
  year: Number
});

const ItemModel = mongoose.model('Item', itemSchema);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

class ItemMongo {
  constructor() {
    //prostor pro tvorbu indexu atp.
  }

  async createItem(doc) {
    const item = new ItemModel(doc);
    return await item.save();
  }

  async updateItem(id, doc) {
    return ItemModel.findByIdAndUpdate(id, doc, {
      new: true
    });
  }

  async getItem(id){
    return ItemModel.findById(id);
  }

  async listItem() {
    //prostor pro implementaci logiky listovani na zaklade atributu a aplikovani do mongo query
    return ItemModel.find({});
  }

  async deleteItem(id) {
    return ItemModel.findByIdAndDelete(id);
  }

}

module.exports = new ItemMongo();
