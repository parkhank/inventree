const express = require("express");
const Location = require("../models/locations");
const router = express.Router();

router
.route("/")
.get(async (req, res) => {
  const locations = await Location.fetchAll();
  return res.status(200).json(locations)
})

module.exports = router;