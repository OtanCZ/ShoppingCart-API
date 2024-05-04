const mongoose = require('mongoose');

//Připojení k DB - connection string s přímým připojením do databáze s názvem UHK
mongoose.connect(process.env.DB_URL);

//Definice schématu (collection), která se při neexistenci vytvoří v připojené databázi
const Schema = mongoose.Schema;
const itemSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    count: {
        type: Number,
    },
    state: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
    }

});

const ItemModel = mongoose.model('Item', itemSchema);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

class ShoppingItemMongo {
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

    async getItem(id) {
        return ItemModel.findById(id);
    }

    async listItem(doc) {
        let { content, count, state, createdAt } = doc;
        let query = {};

        // filter by case-insensitive content if provided
        if (content) {
            query.content = { $regex: content, $options: "i" };
        }

        // filter by count if provided
        if (count) {
            query.count = count;
        }

        // filter by state if provided
        if (state) {
            query.state = { $regex: state, $options: "i" };
        }

        // filter by createdAt if provided
        if (createdAt) {
            query.createdAt = { $regex: createdAt, $options: "i" };
        }


        return ItemModel.find(query);
    }

    async deleteItem(id) {
        return ItemModel.findByIdAndDelete(id);
    }

}

module.exports = new ShoppingItemMongo();
