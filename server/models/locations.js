const bookshelf = require("../bookshelf");

const Location = bookshelf.model("Location", {
  tableName: "locations",
  inventory() {
    return this.belongsTo('Inventory')
  },
  casesUsed() {
    return this.belongsTo('CasesUsed')
  }
});

module.exports = Location;