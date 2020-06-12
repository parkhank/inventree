const bookshelf = require("../bookshelf");

const Item = bookshelf.model("Item", {
  tableName: "items",
  inventory() {
    return this.belongsTo('Inventory')
  }
});

module.exports = Item;