const ItemMongo = require("../database/shoppingItem-mongo");
const { StatusError } = require("../utils/errors");

class ShoppingItemModel {
    //TODO místo pro logiku commandu - validace vstupů, business logika commandu, atp.

    statusEnum = ['ACTIVE', 'CANCELLED', 'DELIVERED', 'SHIPPED'];

    constructor() {
    }

    async createItem(doc) {
        if (!doc.content) throw new StatusError('Item content is required');
        if (!doc.state) throw new StatusError('Item state is required');
        if (doc.count <= 0) throw new StatusError('Item count must be at least 1');
        doc.count = doc.count || 1;
        doc.state = doc.state.toUpperCase();

        if (this.statusEnum.indexOf(doc.state) === -1) {
            throw new StatusError('Invalid state, must be one of: ' + this.statusEnum.join(', '));
        }

        return await ItemMongo.createItem(doc);
    }

    async updateItem(id, doc) {
        const item = await ItemMongo.getItem(id);
        if(!item) throw new StatusError('Item not found', 404);

        if(doc.state) {
            doc.state = doc.state.toUpperCase();
            if (this.statusEnum.indexOf(doc.state) === -1) {
                throw new StatusError('Invalid state, must be one of: ' + this.statusEnum.join(', '));
            }
        }

        if(doc.count) {
            if (doc.count <= 0) throw new StatusError('Item count must be at least 1');
        }

        return await ItemMongo.updateItem(id, doc);
    }

    async getItem(id) {
        const item = await ItemMongo.getItem(id);
        if(!item) throw new StatusError('Item not found', 404);
        return item;
    }

    async listItems(doc) {
        if (doc.state) {
            doc.state = doc.state.toUpperCase();

            if (this.statusEnum.indexOf(doc.state) === -1) {
                throw new StatusError('Invalid state, must be one of: ' + this.statusEnum.join(', '));
            }
        }

        return await ItemMongo.listItem(doc);
    }

    async deleteItem(id) {
        const item = await ItemMongo.getItem(id);
        if(!item) throw new StatusError('Item not found', 404);

        return await ItemMongo.deleteItem(id);
    }
}

module.exports = new ShoppingItemModel();
