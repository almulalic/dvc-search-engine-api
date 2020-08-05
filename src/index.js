const express = require("express");

const cors = require("cors")({ origin: true });
const bodyParser = require("body-parser");

DvcService = require("./Services/DataService");
DataController = require("./Controllers/DataController");
SearchController = require("./Controllers/SearchController");

const app = express();
let port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/data", DataController);
app.use("/search", SearchController);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
