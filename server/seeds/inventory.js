const itemData = require("../seed_data/items");
const locationData = require("../seed_data/locations")

exports.seed = function(knex) {
  return knex('inventory')
    .del()
    .then(() => {
      return knex("items").del();
    })
    .then(() => {
      return knex("items").insert(itemData);
    })
    .then(() => {
      return knex("locations").del();
    })
    .then(() => {
      return knex("locations").insert(locationData);
    })
    .then(() => {
      return knex("items")
        .pluck("id")
    })
    .then((itemIDs) => {
      return knex("locations")
        .pluck("id")
        .then(locationIDs => {
          return [locationIDs, itemIDs]
        });
    })
    .then(([locationIDs, itemIDs]) => {
      const inventoryData = [];
      itemIDs.map(item => {
        locationIDs.map(location => {
          inventoryData.push(
            { location_id: location, item_id: item }
          )
        })
      })
      return knex("inventory").insert(inventoryData);
    });
};
