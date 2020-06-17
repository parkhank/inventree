const express = require("express");
const Inventory = require("../models/inventory");
const Item = require("../models/items");
const Location = require("../models/locations");
const CasesUsed = require("../models/casesUsed");
const router = express.Router();

router
.route("/")
.get(async (req, res) => {
  const inventories = await Inventory.fetchAll();
  const items = await Item.fetchAll();
  const locations = await Location.fetchAll();
  let inventoryPage = [];
  inventories.forEach(({ attributes }) => {
    inventoryPage.push(
      {
        ...attributes,
        item_details: items.find(item => item.id === attributes.item_id),
        location_details: locations.find(location => location.id === attributes.location_id),
      }
    )
  })
  return res.status(200).json(inventoryPage);
})

router
.route("/:location")
.post(async (req, res) => {
  const locationID = await Location.where({
    name: req.params.location
  }).fetch();
  const oldInventory = await Inventory.where({
    item_id: req.body.item_id,
    location_id: locationID.attributes.id,
  }).fetch();
  const oldCount = oldInventory.attributes.cases;
  const newCount = await new CasesUsed({
    item_id: req.body.item_id,
    location_id: locationID.attributes.id,
    cases: oldCount - req.body.cases,
  }).save(null, { method: 'insert' })
  return res.status(201).json(newCount)
})
.put(async (req, res) => {
  const locationID = await Location.where({
    name: req.params.location
  }).fetch();
  const toUpdate = await Inventory.where({
    item_id: req.body.item_id,
    location_id: locationID.attributes.id,
  }).fetch();
  const updated = await toUpdate.save({
    cases: req.body.cases
  }, { patch: true })
  return res.status(200).json(updated)
})

module.exports = router;