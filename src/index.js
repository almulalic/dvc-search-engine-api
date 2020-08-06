const express = require("express");

const cors = require("cors")({ origin: true });
const bodyParser = require("body-parser");
const moment = require("moment");
const DataService = require("./Services/DataService");

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
  setInterval(() => {
    let time = new Date();
    const mins = time.getMinutes();
    const diff = mins % 30;
    time.setMinutes(mins - diff);
    time.setSeconds(0);

    let mom1 = moment(time).add(30, "m").valueOf();
    let mom2 = moment().valueOf();

    if (mom1 === mom2) {
      console.log("Refreshed in ", moment(mom1).format("YYYY-MM-DD HH:mm:ss"));
      DataService.RefreshData();
    }
  }, 10000);
});
