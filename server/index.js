const express = require("express");
const inventoryRoute = require("./routes/inventory");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/inventory", inventoryRoute);

app.listen(8080, () => {
  console.log(`Server listening on 8080`);
});
