const express = require("express");
const mongoose = require("mongoose");

// setting up routes, port and DB connect
const app = express();
const db = mongoose.connect("mongodb://localhost/itemsAPI");
const itemsRouter = express.Router();
const port = process.env.PORT || 3000;
const Items = require("./models/itemModel");


// Get items from mongo DB 
itemsRouter.route("/items").get((req, res) => {
    //filter search items using the items name in the urls
    const  query = {};
    if(req.query.itemName){
        query.itemName = req.query.itemName
    }
    Items.find(query, (err, items) => {
      if (err) {
        return res.send(err);
      }
      return res.json(items);
    });
});


// Get items from mongo DB 
itemsRouter.route("/items/:itemId").get((req, res) => {
    //find idem by id 
    Items.findById(req.params.itemId, (err, items) => {
      if (err) {
        return res.send(err);
      }
      return res.json(items);
    });
});

// route to get to API
app.use("/api", itemsRouter);


// Rooot Route
app.get("/", (req, res) => {
  res.send("welcome");
});


//Port to listen on
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
