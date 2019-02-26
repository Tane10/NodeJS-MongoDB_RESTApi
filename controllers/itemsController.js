function itemsController(Items) {
  function post(req, res) {
    const items = new Items(req.body);

    items.save();
    return res.status(201).json(items);
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
      return res.json(items);
    });
  }
  return {post,get};
}

module.exports = itemsController;
