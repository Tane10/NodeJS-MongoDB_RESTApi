const express = require("express");

function routes(Items) {
  const itemsRouter = express.Router();
  // Get items from mongo DB
  itemsRouter
    .route("/items")

    //post items to API and save in DB
    .post((req, res) => {
      const items = new Items(req.body);

      items.save();
      return res.status(201).json(items);
    })

    // Get items from mongo DB
    .get((req, res) => {
      //filter search items using the items name in the urls
      const query = {};
      if (req.query.itemName) {
        query.itemName = req.query.itemName;
      }
      Items.find(query, (err, items) => {
        if (err) {
          return res.send(err);
        }
        return res.json(items);
      });
    });

  // Get items from mongo DB
  // Middleware so so you don't have to repeat the findById function
  itemsRouter.use("/items/:itemId", (req, res, next) => {
    Items.findById(req.params.itemId, (err, items) => {
      if (err) {
        return res.send(err);
      }
      if (items) {
        req.items = items;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  itemsRouter.route("/items/:itemId")
    //find idem by id
    .get((req, res) => {res.json(req.items);
    })

    // Update a item by using its id
    .put((req, res) => {
      const { items } = req;
      items.itemsName = req.body.itemName;
      items.itemDescription = req.body.itemDescription;
      items.quality = req.body.quality;

      req.items.save((err) => {
        if(err) {
            return res.send(err);
        }
        return res.json(items);
    });
      return res.json(items);
    })

    //FIXME: PATCH NOT WORKING
    .patch((req, res) => {
      const { items } = req;
      // if user sends id trhen delete id 
      if(req.body._id){
          delete req.body._id;
      }
      // Loop through the json request and only update what user sends
      Object.defineProperties(req.body).forEach(item => {
        const key = item[0];
        const value = item[1];
        items[key] = value;
      });
      req.items.save((err) => {
          if(err) {
              return res.send(err);
          }
          return res.json(items);
      });
    });
  return itemsRouter;
}

module.exports = routes;
