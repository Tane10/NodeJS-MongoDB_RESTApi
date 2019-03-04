const express = require("express");
const itemsController = require('../controllers/itemsController');

//TODO: Add HATEOAS to all routes to make it eaiser for my self

function routes(Items) {
  const itemsRouter = express.Router();
  const controller = itemsController(Items);
  // Get items from mongo DB
  itemsRouter.route("/items")

    //post items to API and save in DB
    .post(controller.post)

    // Get items from mongo DB
    .get(controller.get);
    

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
    .get((req, res) => {
      const returnItem = req.items.toJSON();
      
      returnItem.links = {};
      returnItem.links.FilterByItemId = `http://${req.headers.host}/api/items/?itemId=${req.items._id}`
      
      res.json(returnItem);
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

    .patch((req, res) => {
      const { items } = req;
      // if user sends id trhen delete id 
      if(req.body._id){
          delete req.body._id;
      }
      // Loop through the json request and only update what user sends
      Object.entries(req.body).forEach(itm => {
        const key = itm[0];
        const value = itm[1];
        items[key] = value;
      });
      req.items.save((err) => {
          if(err) {
              return res.send(err);
          }
          return res.json(items);
      });
    })
    .delete((req,res) => {
        req.items.remove((err) => {
            if (err){
                return res.send(err);
            }
            return res.sendStatus(204);
        })
    })
  return itemsRouter;
}

module.exports = routes;
