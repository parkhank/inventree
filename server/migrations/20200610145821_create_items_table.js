
exports.up = knex => {
  return knex.schema.createTable("items", table => {
    table.integer("id").primary();
    table.string("name").notNullable();
    table.decimal("cost", 5, 2).notNullable();
    table.integer("unitsPerCase").nullable();
    table.decimal("kgPerCase").nullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("items");
};
