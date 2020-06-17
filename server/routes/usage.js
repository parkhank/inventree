const express = require("express");
const CasesUsed = require("../models/casesUsed");
const router = express.Router();

router
.route("/")
.get(async (req, res) => {
  const usage = await CasesUsed.fetchAll();
  let usagePage = [];
  usage.forEach(({ attributes }) => {
    usagePage.push(
      { ...attributes }
    )
  })
  return res.status(200).json(usagePage);
})

module.exports = router;