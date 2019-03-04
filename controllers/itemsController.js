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

    if (req.query.quality) {
      const qualityUpper = req.query.quality.toUpperCase();

      query.quality = qualityUpper;

    }

    Items.find(query, (err, items) => {
      if (err) {
        return res.send(err);
      }
      //hatoes self documentation
      const returnItems = items.map(items => {
        const newItems = items.toJSON();
        newItems.links = {};

        //Search using items id
        newItems.links.self = `http://${req.headers.host}/api/items/${
          items._id
        }`;

        //search using items qulity
        newItems.links.quality = `http://${
          req.headers.host
        }/api/items?quality=${items.quality}`;

        //search using items name
        if (items.itemName.includes(" ")) {
          const formatedItemName = items.itemName.split(" ").join("%20");

          newItems.links.itemName = `http://${
            req.headers.host
          }/api/items?itemName=${formatedItemName}`;
          return newItems;
        }
      });
      return res.json(returnItems);
    });
  }
  return { post, get };
}

module.exports = itemsController;
