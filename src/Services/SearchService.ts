import data from "../Data/liveData.json";

import {
  FilterBrokers,
  FilterResorts,
  FilterUseYears,
  FilterStatus,
} from "../Common/Algorithms/FilterAlgorithms";

import {
  SortById,
  SortByResort,
  SortByPoints,
  SortByBroker,
  SortByPrice,
  SortByUseYear,
} from "./../Common/Algorithms/SortingAlgorithms";

import { chunk } from "../Common/Algorithms/PaginationAlgorithms";
import { FilterBody, OrderDirection, SortIdx } from "../Common/Enums/Interface";

class SearchService {
  public FilterData = (req, res) => {
    let filteredData: any = data;

    const body = req.body as FilterBody;
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
      case "useYear":
        filteredData = SortByUseYear(filteredData, sord);
        break;
      case "price":
        filteredData = SortByPrice(filteredData, sord);
        break;
      case "broker":
        filteredData = SortByBroker(filteredData, sord);
        break;
    }

    res.json({
      total: filteredData.length,
      records: chunk(filteredData, body.itemsPerPage)[body.page - 1] || [],
    });
  };

  public onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  public Unique = (req, res) => {
    let arr = [];
    data.forEach((x) => {
      arr.push(x.status);
    });

    // var unqiue = arr.filter(this.onlyUnique);

    // res.json(unqiue);
  };
}

export default new SearchService();
