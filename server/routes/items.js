const express = require("express");
const Inventory = require("../models/inventory");
const Item = require("../models/items");
const Location = require("../models/locations");
const router = express.Router();

router
.route("/")
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

module.exports = router;

