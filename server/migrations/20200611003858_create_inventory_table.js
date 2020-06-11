
exports.up = knex => {
  return knex.schema.createTable("inventory", table => {
    table.increments("id").primary();
    table
      .integer("item_id")
      .notNullable()
      .references("id")
      .inTable("items");
    table
      .integer("location_id")
      .notNullable()
      .references("id")
      .inTable("locations");
    table
      .integer("cases")
      .notNullable()
      .defaultTo(0);
  })
};

exports.down = knex => {
  return knex.schema.dropTable("inventory");
};
