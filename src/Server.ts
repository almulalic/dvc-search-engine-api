import cors from "cors";
import moment from "moment";
import express from "express";
import bodyParser from "body-parser";

import DataScrapeController from "./API/Controllers/DataScraperController";
import SearchController from "./API/Controllers/SearchController";
import DataScraperService from "./Services/DataScraperService";
import ContactController from "./API/Controllers/ContactController";

const app = express();
require("dotenv").config();
let port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/dataScraper", DataScrapeController);
app.use("/contact", ContactController);
app.use("/search", SearchController);

app.listen(port, () => {
  console.info("Server is running on port: " + port);

  setInterval(() => {
    let time = new Date();

    const mins = time.getMinutes();

    time.setMinutes(mins - (mins % 29));
    time.setSeconds(0);

    let mom1 = moment(time).add(29, "m").valueOf();

    if (mom1 <= moment().valueOf()) {
      console.log("Refreshed in ", moment(mom1).format("YYYY-MM-DD HH:mm:ss"));
      DataScraperService.RefreshData(null, null);
    }
  }, 10000);
});

export default app;
