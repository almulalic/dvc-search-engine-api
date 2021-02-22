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

import conn from "../Database/connection";

import { FilterBody, OrderDirection, SortIdx, ResortAdapter } from "../Common/Types/Interface";

import fs from "fs";
import path from "path";
import { classToPlain } from "class-transformer";

class SearchService {
  public GetOverview = (req, res) => {
    const data =
      JSON.parse(fs.readFileSync(path.join(__dirname, "..", "Data", "liveData.json")) as any) ?? [];

    const validData =
      JSON.parse(fs.readFileSync(path.join(__dirname, "..", "Data", "validLiveData.json")) as any) ?? [];

    const ranges = MaxAndMinRanges(data);

    res.json({
      total: data.length,
      valid: validData.length,
      points: ranges.points,
      price: ranges.price,
      pricePerPoint: ranges.pricePerPoint,
    });
  };

  public FilterData = async (req, res) => {
    const query = req.body.includeDefectiveData
      ? "SELECT * FROM liveInvalidData WHERE archivedAt IS NULL ORDER BY createdAt DESC"
      : "SELECT * FROM liveValidData WHERE archivedAt IS NULL ORDER BY createdAt DESC";

    await conn.query(query, (err, result, fields) => {
      let plainResult = classToPlain(result[0]);

      const body = req.body as FilterBody;

      if (!plainResult) {
        res.status(400);
        res.json("No data");
        return;
      }

      let filteredData: any = JSON.parse(plainResult.data);

      const sidx = body.sidx as SortIdx;
      const sord = body.sord === ("ASC" as OrderDirection);

      if (body.broker.length > 0) filteredData = FilterBrokers(filteredData, body.broker);

      if (body.resort.length > 0) filteredData = FilterResorts(filteredData, body.resort);

      if (body.useYear.length > 0) filteredData = FilterUseYears(filteredData, body.useYear);

      if (body.status.length > 0) filteredData = FilterStatus(filteredData, body.status);

      if (body.pointsRange[0] !== null && body.pointsRange[1] !== null)
        filteredData = FilterPoints(filteredData, body.pointsRange);

      if (body.priceRange[0] !== null && body.priceRange[1] !== null)
        filteredData = FilterPrice(filteredData, body.priceRange);

      if (body.pricePerPointRange[0] !== null && body.pricePerPointRange[1] !== null)
        filteredData = FilterPricePerPoint(filteredData, body.pricePerPointRange);

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
        total: plainResult.length,
        totalValid: plainResult.countValid,
        totalFiltered: filteredData.length,
        records: filteredData,
      });
    });
  };

  public GetAll = (req, res) => {
    const data =
      JSON.parse(fs.readFileSync(path.join(__dirname, "..", "Data", "liveData.json")) as any) ?? [];

    const validData =
      JSON.parse(fs.readFileSync(path.join(__dirname, "..", "Data", "validLiveData.json")) as any) ?? [];

    res.json({
      records: data,
    });
  };

  public onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  public Unique = (req, res) => {
    const data =
      JSON.parse(fs.readFileSync(path.join(__dirname, "..", "Data", "liveData.json")) as any) ??
      ([] as ResortAdapter[]);

    const arr = data.map((x) => {
      return x.resort;
    });

    var unqiue = arr.filter(this.onlyUnique);

    res.json(unqiue);
  };
}

export default new SearchService();
