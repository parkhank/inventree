const bookshelf = require("../bookshelf");

const Inventory = bookshelf.model("Inventory", {
  tableName: "inventory",
  locations() {
    return this.hasMany("Location")
  },
  items() {
    return this.hasMany("Item")
  }
});

module.exports = Inventory;