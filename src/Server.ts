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
    if (new Date().getMinutes() === 0) {
      console.log("Refreshed in ", moment().utc().format("DD-MM-YYYY HH:mm:ss"));
      DataScraperService.RefreshData(null, null);
    }
  }, 60000);
});

export default app;
