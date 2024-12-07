const Item = require("../models/itemModel");

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items", error: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to create item", error: error.message });
  }
};

module.exports = { getItems, createItem };
