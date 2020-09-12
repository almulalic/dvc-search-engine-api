import fs from "fs";
import path from "path";

import { ResortAdapter } from "../../src/Common/Types/Interface";

import {
  FilterUseYears,
  FilterPrice,
} from "../../src/Common/Algorithms/FilterAlgorithms";
import { UseYearAlias } from "../../src/Common/Types/Aliases";
import { RandomizeInRange, RandomizeRange } from "../utils";
import { MaxAndMinRanges } from "../../src/Common/Algorithms/CalculationAlgorithms";

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

const ranges = MaxAndMinRanges(data);
const validDataRanges = MaxAndMinRanges(validData);

//#endregion

//#region All Data

for (let i = 0; i < 10; ++i) {
  test(`Price Filter Test - Simple [${i}/10] - All Data`, () => {
    const range = RandomizeRange(ranges.price[0], ranges.price[1]);

    expect(FilterPrice(data, [range[0], range[1]])).toHaveLength(
      data.filter(
        (x: ResortAdapter) => x.price >= range[0] && x.price <= range[1]
      ).length
    );
  });
}

//#endregion

//#region Valid Data

for (let i = 0; i < 10; ++i) {
  test(`Price Filter Test - Simple [${i}/10] - All Data`, () => {
    const range = RandomizeRange(
      validDataRanges.price[0],
      validDataRanges.price[1]
    );

    expect(FilterPrice(validData, [range[0], range[1]])).toHaveLength(
      validData.filter(
        (x: ResortAdapter) => x.price >= range[0] && x.price <= range[1]
      ).length
    );
  });
}

//#endregion
