const bookshelf = require("../bookshelf");

const CasesUsed = bookshelf.model("CasesUsed", {
  tableName: "casesUsed",
  locations() {
    return this.hasMany("Location")
  },
  items() {
    return this.hasMany("Item")
  }
});

module.exports = CasesUsed;