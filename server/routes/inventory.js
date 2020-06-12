const express = require("express");
const Inventory = require("../models/inventory");
const Item = require("../models/items");
const Location = require("../models/locations");
const router = express.Router();

router
.route("/")
.get((req, res) => {
  Inventory
    .fetchAll()
    .then(inventories => {
      return(
        Item.fetchAll()
        .then(items => {
          return(
            Location.fetchAll()
            .then(locations => {
              return [items, inventories, locations]
            })
          )
        })
      )
    })
    .then(([items, inventories, locations]) => {
      // create an object of inventory lines with item data
      // res.status(200).json(newObject);
      res.status(200).json(inventories);
    })
})

module.exports = router;