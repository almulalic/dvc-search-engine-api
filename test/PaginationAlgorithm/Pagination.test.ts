import fs from "fs";
import path from "path";

import { ResortAdapter } from "../../src/Common/Types/Interface";

import { FilterUseYears } from "../../src/Common/Algorithms/FilterAlgorithms";
import { UseYearAlias } from "../../src/Common/Types/Aliases";
import { RandomizeInRange } from "../utils";
import { GenerateDummyData } from "./../utils";
import { chunk } from "./../../src/Common/Algorithms/PaginationAlgorithms";

//#region Globals

const data =
  JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", "..", "src", "Data", "liveData.json")
    ) as any
  ) ?? [];

const validData =
  JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", "..", "src", "Data", "liveData.json")
    ) as any
  ) ?? [];

//#endregion

//#region Chunks

for (let i = 0; i < 10; ++i) {
  test(`Pagination Test - Simple [${i}/10] - All Data`, () => {
    const dummyData = GenerateDummyData(i);

    expect(chunk(dummyData, 2)).toHaveLength(dummyData.length % 2);
  });
}

//#endregion
