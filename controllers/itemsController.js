function itemsController(Items) {
  function post(req, res) {
    const items = new Items(req.body);

    if (!req.body.itemName) {
      res.status(400);
      return res.send("Items name is required");
    }

    items.save();
    res.status(201);
    return res.json(items);
  }

  function get(req, res) {
    //filter search items using the items name in the urls
    const query = {};
    if (req.query.itemName) {
      query.itemName = req.query.itemName;
    }
    Items.find(query, (err, items) => {
      if (err) {
        return res.send(err);
      }
      //hatoes self documentation
      const returnItems = items.map((items) => {
        const newItems = items.toJSON();
        newItems.links = {};

        //Search using items id 
        newItems.links.self = `http://${req.headers.host}/api/items/${
          items._id
        }`;

        //search using items name
        if(items.itemName.includes(' '))
        {
          const formatedItemName = items.itemName.split(' ').join('%20');
          
          newItems.links.itemName = `http://${req.headers.host}/api/items?=${
          formatedItemName
        }`;
        return newItems;
        }
        
      });
      return res.json(returnItems);
    });
  }

  function getFilteredItemName(req,res){
    const filteredItemQuery = {};
    if (req.filteredItemQuery.itemName) {
      filteredItemQuery.itemName = req.filteredItemQuery.itemName
    }
    Items.find(filteredItemQuery,(err, items) =>{
      if (err) {
        return res.send(err)
      }

      //HATEOS self documentation filter by item name
      const returnFilteredItems = items.map((items) =>{
        const newItems = items.toJSON();
        newItems.links = {};
        newItems.links.self = `http://${req.headers.host}/api/items/${items.itemName}`;
        return newItems;
    });
    return res.json(returnFilteredItems);
  });
  }
  return { post, get, getFilteredItemName };

}

module.exports = itemsController;