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
.put(async (req, res) => {
  console.log(req.body.item_id, req.body.locations_id)
  const inventory = await Inventory.where({
    item_id: req.body.item_id,
    location_id: req.body.location_id
  }).fetch();
  const oldCases = inventory.attributes.cases;
  const invoice = await inventory.save({
    cases: parseInt(req.body.cases) + parseInt(oldCases)
  }, { patch: true });
  return res.status(201).json(invoice);
})

const singlePost = async (body, params, res) => {
  const locationID = await Location.where({
    name: params.location
  }).fetch();
  const oldInventory = await Inventory.where({
    item_id: body.item_id,
    location_id: locationID.attributes.id,
  }).fetch();
  const oldCount = oldInventory.attributes.cases;
  const newCount = await new CasesUsed({
    item_id: body.item_id,
    location_id: locationID.attributes.id,
    cases: oldCount - body.cases,
  }).save(null, { method: 'insert' })
  return newCount.attributes;
}

const singlePut = async (body, params, res) => {
  const locationID = await Location.where({
    name: params.location
  }).fetch();
  const toUpdate = await Inventory.where({
    item_id: body.item_id,
    location_id: locationID.attributes.id,
  }).fetch();
  const updated = await toUpdate.save({
    cases: body.cases
  }, { patch: true })
  return updated.attributes;
}

router
.route("/:location")
.post(async (req, res) => {
  const countList = [];
  req.body.counts.forEach(count => {
    const newCount = singlePost(count, req.params, res);
    countList.push(newCount);
  })
  return res.status(201).json(await Promise.all(countList));
})
.put(async (req, res) => {
  const updatedList = [];
  req.body.counts.forEach(count => {
    const newUpdate = singlePut(count, req.params, res);
    updatedList.push(newUpdate);
  })
  return res.status(200).json(await Promise.all(updatedList));
})

module.exports = router;