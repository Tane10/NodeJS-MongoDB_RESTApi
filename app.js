const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to mongoDB api");
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});
