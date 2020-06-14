const express = require("express");
const Inventory = require("../models/inventory");
const Item = require("../models/items");
const Location = require("../models/locations");
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

module.exports = router;