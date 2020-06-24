const express = require("express");
const cors = require("cors")({ origin: true });

const DataController = express.Router();

DataController.use(cors);

DataController.get("/FetchDVCResaleMarketData", (req, res) => {
  DvcService.FetchDVCResaleMarketData(req, res);
});

DataController.get("/FetchResalesDVC", (req, res) => {
  DvcService.FetchResalesDVC(req, res);
});

module.exports = DataController;
