const express = require("express");
const cors = require("cors")({ origin: true });
const SearchService = require("../Services/SearchService");

const SearchController = express.Router();

SearchController.use(cors);

SearchController.post("/FilterData", (req, res) => {
  SearchService.FilterData(req, res);
});

SearchController.post("/Unique", (req, res) => {
  SearchService.Unique(req, res);
});

module.exports = SearchController;
