const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// setting up routes, port and DB connect
const app = express();
const db = mongoose.connect("mongodb://localhost/itemsAPI");
//const itemsRouter = express.Router();
const port = process.env.PORT || 3000;
const Items = require("./models/itemModel");

const itemsRouter = require("./Routes/ItemsRouter")(Items);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
