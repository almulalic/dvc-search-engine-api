const express = require("express");
const DataService = require("../Services/DataService");
const cors = require("cors")({ origin: true });

const DataController = express.Router();

DataController.use(cors);

DataController.get("/FetchDVCResaleMarket", (req, res) => {
  DataService.FetchDVCResaleMarketData(req, res);
});

DataController.get("/FetchResalesDVC", (req, res) => {
  DataService.FetchResalesDVC(req, res);
});

DataController.get("/FetchDVCStore", (req, res) => {
  DataService.FetchDVCStore(req, res);
});

DataController.get("/FetchDVCResalesShop", (req, res) => {
  DataService.FetchDVCResalesShop(req, res);
});

DataController.get("/FetchDVCResale", (req, res) => {
  DataService.FetchDVCResale(req, res);
});

DataController.put("/RefreshData", (req, res) => {
  DataService.RefreshData(req, res, true);
});

module.exports = DataController;
