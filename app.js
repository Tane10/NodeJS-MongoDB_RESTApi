const express = require("express");

const app = express();
const itemsRouter = express.Router();
const port = process.env.PORT || 3000;

itemsRouter.route('/items')
    .get((req, res) => {
        const response = {hello: "this is it api"};
        res.json(response);
    });

app.use('/api', itemsRouter);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(port, () => {
    console.log(`running on port ${port}`)
})