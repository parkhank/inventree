const bookshelf = require("../bookshelf");

const Item = bookshelf.model("Item", {
  tableName: "items",
  inventory() {
    return this.belongsTo('Inventory')
  },
  casesUsed() {
    return this.belongsTo('CasesUsed')
  }
});

module.exports = Item;