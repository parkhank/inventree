
exports.up = knex => {
  return knex.schema.createTable("locations", table => {
    table.increments("id").primary();
    table.string("name").notNullable();
  })
};

exports.down = knex => {
  return knex.schema.dropTable("locations");
};
