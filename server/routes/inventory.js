const express = require("express");
const Inventory = require("../models/inventory");
const router = express.Router();

router
.route("/")
.get((req, res) => {
  Inventory
    .fetchAll()
    .then(inventories => {
      res.status(200).json(inventories);
    })
})

module.exports = router;