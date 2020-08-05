const data = require("../Data/liveData.json");
const {
  FilterMarkets,
  FilterResorts,
  FilterUseYears,
} = require("../Algorithms/FilterAlgorithms");

const {
  SortById,
  SortByResort,
  SortByPoints,
  SortByDVCMarket,
  SortByPrice,
} = require("./../Algorithms/SortingAlgorithms");

const { chunk } = require("../Algorithms/PaginationAlgorithms");

class SearchService {
  static FilterData = (req, res) => {
    let resultData = data;

    if (req.body.markets.length > 0) {
      resultData = FilterMarkets(resultData, req.body.markets);
    }

    if (req.body.resorts.length > 0) {
      resultData = FilterResorts(resultData, req.body.resorts);
    }

    if (req.body.useYears.length > 0) {
      resultData = FilterUseYears(resultData, req.body.useYears);
    }

    switch (req.body.sidx) {
      case "Id":
        resultData = SortById(resultData, req.body.sord);
        break;
      case "Resort":
        resultData = SortByResort(resultData, req.body.sord);
        break;
      case "Points":
        resultData = SortByPoints(resultData, req.body.sord);
        break;
      case "Use Year":
        resultData = SortByUseYear(resultData, req.body.sord);
        break;
      case "Price":
        resultData = SortByPrice(resultData, req.body.sord);
        break;
      case "Market":
        resultData = SortByDVCMarket(resultData, req.body.sord);
        break;
    }

    res.json({
      total: resultData.length,
      records:
        chunk(resultData, req.body.itemsPerPage)[req.body.page - 1] || [],
    });
  };

  static onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  static Unique = (req, res) => {
    let arr = [];
    data.forEach((x) => {
      arr.push(x.statusname);
    });

    var unqiue = arr.filter(this.onlyUnique);

    res.json(unqiue);
  };
}

module.exports = SearchService;
