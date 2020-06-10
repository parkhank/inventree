
exports.up = knex => {
  return knex.schema.createTable("items", table => {
    table.integer("id").primary();
    table.string("name").notNullable();
    table.string("unit").notNullable().defaultTo("case");
    table.decimal("kgPerUnit", 5, 2).notNullable();
    table.decimal("pricePerUnit", 5, 2).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("items");
};
