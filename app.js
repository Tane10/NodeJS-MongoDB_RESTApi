const express = require("express");
const mongoose = require("mongoose");

// setting up routes, port and DB connect
const app = express();
const db = mongoose.connect("mongodb://localhost/itemsAPI");
const itemsRouter = express.Router();
const port = process.env.PORT || 3000;
const Items = require("./models/itemModel");

itemsRouter.route("/items").get((req, res) => {
  Items.find((err, items) => {
    if (err) {
      return res.send(err);
    }
    return res.json(items);
  });
});

app.use("/api", itemsRouter);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
