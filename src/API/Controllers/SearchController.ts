import cors from "cors";
import express from "express";

import SearchService from "../../Services/SearchService";

const SearchController = express.Router();

//#region Controllers

SearchController.get("/overview", (req, res) => {
  SearchService.GetOverview(req, res);
});

SearchController.post("/FilterData", (req, res) => {
  SearchService.FilterData(req, res);
});

SearchController.post("/Unique", (req, res) => {
  SearchService.Unique(req, res);
});

//#endregion

export default SearchController;
