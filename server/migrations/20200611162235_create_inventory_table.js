
exports.up = knex => {
  return knex.schema.createTable("inventory", table => {
    table.increments("id").primary();
    table
      .integer("location_id")
      .notNullable()
      .unsigned()
      .references("locations.id");
    table
      .integer("item_id")
      .notNullable()
      .references("items.id");
    table
      .integer("cases")
      .notNullable()
      .defaultTo(0);
  })
};

exports.down = knex => {
  return knex.schema.dropTableIfExists("inventory");
};
