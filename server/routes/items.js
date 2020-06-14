const express = require("express");
const Item = require("../models/items");
const router = express.Router();

router
.route("/")
.post((req, res) => {
  new Item({
    id: req.body.id,
    name: req.body.name,
    cost: req.body.cost,
    unitsPerCase: req.body.unitsPerCase,
    kgPerCase: req.body.kgPerCase,
  })
  .save(null, {method: 'insert'})
  .then(newItem => {
    res.status(201).json({ newItem })
  })
})

module.exports = router;