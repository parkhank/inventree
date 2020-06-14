const express = require("express");
const cors = require('cors');
const inventoryRoute = require("./routes/inventory");
const locationsRoute = require("./routes/locations");
const itemsRoute = require("./routes/items");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/inventory", inventoryRoute);
app.use("/locations", locationsRoute);
app.use("/items", itemsRoute);

app.listen(8080, () => {
  console.log(`Server listening on 8080`);
});
