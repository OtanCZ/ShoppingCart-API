const express = require('express');
const app = express();
const ItemModel = require("../models/item-model");

app.post('/create', async (req, res) => {
  try {
    const { name, country, year } = req.body;
    res.send(await ItemModel.createItem({name, country, year}));
  } catch (err) {
    console.error('Error creating document:', err);
    res.status(500).send('Error creating document');
  }
});

app.get('/list', async (req, res) => {
  try {
    const result = await ItemModel.listItems();
    res.send(result);
  } catch (err) {
    console.error('Error reading documents:', err);
    res.status(500).send('Error reading documents');
  }
});

app.get('/get/:id', async (req, res) => {
  try {
    const result = await ItemModel.getItem(req.params.id);
    res.send(result);
  } catch (err) {
    console.error('Error reading documents:', err);
    res.status(500).send('Error reading documents');
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const result = await ItemModel.updateItem(req.params.id, req.body);
    res.send(result);
  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).send('Error updating document');
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const result = await ItemModel.deleteItem(req.params.id);
    res.send(result);
  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).send('Error updating document');
  }
});

module.exports = app;
