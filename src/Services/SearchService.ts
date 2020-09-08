import data from "../Data/liveData.json";
import validData from "../Data/validLiveData.json";

import { MaxAndMinRanges } from "../Common/Algorithms/CalculationAlgorithms";

import {
  FilterBrokers,
  FilterResorts,
  FilterUseYears,
  FilterStatus,
  FilterPoints,
  FilterPrice,
  FilterPricePerPoint,
  FilterId,
} from "../Common/Algorithms/FilterAlgorithms";

import {
  SortById,
  SortByResort,
  SortByPoints,
  SortByBroker,
  SortByPrice,
  SortByPricePerPoint,
  SortByUseYear,
} from "./../Common/Algorithms/SortingAlgorithms";

import { chunk } from "../Common/Algorithms/PaginationAlgorithms";
import { FilterBody, OrderDirection, SortIdx } from "../Common/Enums/Interface";

class SearchService {
  public GetOverview = (req, res) => {
    const ranges = MaxAndMinRanges(data);

    res.json({
      total: data.length,
      valid: validData.length,
      points: ranges.points,
      price: ranges.price,
      pricePerPoint: ranges.pricePerPoint,
    });
  };

  public FilterData = (req, res) => {
    const body = req.body as FilterBody;

    let filteredData: any = body.includeDefectiveData ? data : validData;

    const sidx = req.sidx as SortIdx;
    const sord = req.sord === ("ASC" as OrderDirection);

    if (body.broker.length > 0)
      filteredData = FilterBrokers(filteredData, body.broker);

    if (body.resort.length > 0)
      filteredData = FilterResorts(filteredData, body.resort);

    if (body.useYear.length > 0)
      filteredData = FilterUseYears(filteredData, body.useYear);

    if (body.status.length > 0)
      filteredData = FilterStatus(filteredData, body.status);

    if (body.pointsRange[0] !== null && body.pointsRange[1] !== null)
      filteredData = FilterPoints(filteredData, body.pointsRange);
    else if (body.priceRange[0] !== null && body.priceRange[1] !== null)
      filteredData = FilterPrice(filteredData, body.pointsRange);
    else if (
      body.pricePerPointRange[0] !== null &&
      body.pricePerPointRange[1] !== null
    )
      filteredData = FilterPricePerPoint(filteredData, body.pointsRange);

    if (body.idInput && body.idInput !== "" && body.idInput !== " ")
      filteredData = FilterId(filteredData, body.idInput);

    switch (sidx) {
      case "id":
        filteredData = SortById(filteredData, sord);
        break;
      case "resort":
        filteredData = SortByResort(filteredData, sord);
        break;
      case "points":
        filteredData = SortByPoints(filteredData, sord);
        break;
      case "price":
        filteredData = SortByPrice(filteredData, sord);
        break;
      case "pricePerPoint":
        filteredData = SortByPricePerPoint(filteredData, sord);
        break;
      case "useYear":
        filteredData = SortByUseYear(filteredData, sord);
        break;
      case "broker":
        filteredData = SortByBroker(filteredData, sord);
        break;
    }

    res.json({
      total: data.length,
      totalValid: validData.length,
      totalFiltered: filteredData.length,
      records:
        chunk(filteredData, body.itemsPerPage)[body.currentPage - 1] || [],
    });
  };

  public onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  public Unique = (req, res) => {
    let arr = [];

    // var unqiue = arr.filter(this.onlyUnique);

    // res.json(unqiue);
  };
}

export default new SearchService();
