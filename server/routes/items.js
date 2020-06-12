const express = require("express");
const Items = require("../models/items");
const router = express.Router();

router
.route("/")
.get((req, res) => {
  Item
    .fetchAll({ withRelated: ["inventory"] })
    .then(items => {
      res.status(200).json(items);
    })
})

module.exports = router;