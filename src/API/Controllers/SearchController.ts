import cors from "cors";
import express from "express";

import SearchService from "../../Services/SearchService";

const SearchController = express.Router();

//#region Controllers

SearchController.post("/FilterData", (req, res) => {
  SearchService.FilterData(req, res);
});

SearchController.post("/Unique", (req, res) => {
  SearchService.Unique(req, res);
});

//#endregion

export default SearchController;
