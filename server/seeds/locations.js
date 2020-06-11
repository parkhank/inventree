const locationsData = require('../seed_data/locationsData');

exports.seed = knex => {
  return knex("locations")
    .del()
    .then(() => {
      return knex("locations").insert(locationsData);
    });
};