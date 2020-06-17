
exports.up = knex => {
  return knex.schema.createTable("casesUsed", table => {
    table.increments("id").primary();
    table
      .timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("location_id")
      .notNullable()
      .unsigned()
      .references("locations.id");
    table
      .integer("item_id")
      .notNullable()
      .references("items.id")
      .onDelete("CASCADE");
    table
      .integer("cases")
      .notNullable();
  })
};

exports.down = knex => {
  return knex.schema.dropTable("casesUsed");
};
