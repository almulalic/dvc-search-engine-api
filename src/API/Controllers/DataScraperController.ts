import cors from "cors";
import express from "express";

import DataScraperService from "../../Services/DataScraperService";

const DataScraperController = express.Router();

//#region Controllers

DataScraperController.get("/ScrapeDVCResaleMarket", (req, res) => {
  DataScraperService.ScrapeDVCResaleMarketData(req, res);
});

DataScraperController.get("/ScrapeResalesDVC", (req, res) => {
  DataScraperService.ScrapeResalesDVC(req, res);
});

DataScraperController.get("/ScrapeDVCStore", (req, res) => {
  DataScraperService.ScrapeDVCStore(req, res);
});

DataScraperController.get("/ScrapeDVCResale", (req, res) => {
  DataScraperService.ScrapeDVCResale(req, res);
});

DataScraperController.get("/ScrapeDVCResalesShop", (req, res) => {
  DataScraperService.ScrapeDVCResalesShop(req, res);
});

DataScraperController.put("/RefreshData", (req, res) => {
  DataScraperService.RefreshData(req, res, true);
});

//#endregion

export default DataScraperController;
