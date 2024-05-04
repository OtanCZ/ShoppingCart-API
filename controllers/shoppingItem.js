const express = require('express');
const app = express();
const ItemModel = require("../models/shoppingItem-model");
const { StatusError } = require("../utils/errors");

app.post('/create', async (req, res) => {
    try {
        const {content, count, state} = req.body;
        res.send(await ItemModel.createItem({
            content,
            count,
            state,
            createdAt: new Date().toISOString()
        }));
    } catch (err) {
        console.error('Error creating document:', err);
        if (err instanceof StatusError) {
            res.status(err.status).send(err.message);
        } else {
            res.status(500).send("Error creating document.");
        }
    }
});

app.get('/list', async (req, res) => {
    try {
        const result = await ItemModel.listItems(req.body);
        res.send(result);
    } catch (err) {
        console.error('Error reading documents:', err);
        if (err instanceof StatusError) {
            res.status(err.status).send(err.message);
        } else {
            res.status(500).send("Error reading documents.");
        }
    }
});

app.get('/get/:id', async (req, res) => {
    try {
        const result = await ItemModel.getItem(req.params.id);
        res.send(result);
    } catch (err) {
        console.error('Error reading documents:', err);
        if (err instanceof StatusError) {
            res.status(err.status).send(err.message);
        } else {
            res.status(500).send("Error reading documents.");
        }
    }
});

app.put('/update/:id', async (req, res) => {
    try {
        const result = await ItemModel.updateItem(req.params.id, req.body);
        res.send(result);
    } catch (err) {
        console.error('Error updating document:', err);
        if (err instanceof StatusError) {
            res.status(err.status).send(err.message);
        } else {
            res.status(500).send("Error updating document.");
        }
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const result = await ItemModel.deleteItem(req.params.id);
        res.send(result);
    } catch (err) {
        console.error('Error updating document:', err);
        if (err instanceof StatusError) {
            res.status(err.status).send(err.message);
        } else {
            res.status(500).send("Error updating document.");
        }
    }
});

module.exports = app;
