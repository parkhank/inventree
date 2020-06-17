const express = require("express");
const Inventory = require("../models/inventory");
const Item = require("../models/items");
const Location = require("../models/locations");
const router = express.Router();

router
.route("/")
.get(async (req, res) => {
  const items = await Item.fetchAll();
  return res.status(200).json(items);
})
.post(async (req, res) => {
  const locations = await Location.fetchAll();
  const newItem = await new Item({
    id: req.body.id,
    name: req.body.name,
    cost: req.body.cost,
    unitsPerCase: req.body.unitsPerCase,
    kgPerCase: req.body.kgPerCase,
  }).save(null, {method: 'insert'})
  const newInventoryArr = await Promise.all(locations.map(({ attributes }) => {
    return(
      new Inventory({
        location_id: attributes.id,
        item_id: newItem.attributes.id,
      }).save()
    )
  }))
  return res.status(201).json(newInventoryArr)
})
.delete(async (req, res) => {
  const deleteItem = await Item.where("id", req.body.id).destroy()
  return res.status(200).json({ deleteItem });
})

module.exports = router;

