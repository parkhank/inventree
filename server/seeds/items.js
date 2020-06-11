const itemsData = require('../seed_data/itemsData');

exports.seed = knex => {
  return knex("items")
    .del()
    .then(() => {
      return knex("items").insert(itemsData);
    });
};