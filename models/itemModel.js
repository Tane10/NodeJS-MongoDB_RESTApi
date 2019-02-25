const mongoose = require("mongoose");

const { Schema } = mongoose;

const itemsModel = new Schema({
  itemName: { type: String },
  itemDescription: { type: String },
  quality: { type: String }
});

module.exports = mongoose.model("Item", itemsModel);
