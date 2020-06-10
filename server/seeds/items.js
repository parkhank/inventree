const itemsData = require('../seed_data/itemsData');

exports.seed = function(knex) {
  return knex("items")
    .del()
    .then(() => {
      return knex("items").insert(itemsData);
    });
};