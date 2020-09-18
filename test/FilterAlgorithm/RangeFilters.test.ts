import fs from "fs";
import path from "path";

import { ResortAdapter } from "../../src/Common/Types/Interface";

import {
  FilterPrice,
  FilterPoints,
  FilterPricePerPoint,
} from "../../src/Common/Algorithms/FilterAlgorithms";
import { RandomizeRange } from "../utils";
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

// Price

for (let i = 0; i < 10; ++i) {
  const randRange = RandomizeRange(ranges.price[0], ranges.price[1]);

  test(`Price Filter - [${i}/10] - [${randRange[0]},${randRange[1]}] - All Data`, () => {
    expect(FilterPrice(data, randRange)).toHaveLength(
      data.filter(
        (x: ResortAdapter) => x.price >= randRange[0] && x.price <= randRange[1]
      ).length
    );
  });
}

// Points

for (let i = 0; i < 10; ++i) {
  const randRange = RandomizeRange(ranges.points[0], ranges.points[1]);

  test(`Points Filter - [${i}/10] - [${randRange[0]},${randRange[1]}] - All Data`, () => {
    expect(FilterPoints(data, randRange)).toHaveLength(
      data.filter(
        (x: ResortAdapter) =>
          x.points >= randRange[0] && x.points <= randRange[1]
      ).length
    );
  });
}

// Price Per Point

for (let i = 0; i < 10; ++i) {
  const randRange = RandomizeRange(
    ranges.pricePerPoint[0],
    ranges.pricePerPoint[1]
  );

  test(`Price Per Point Filter - [${i}/10] - [${randRange[0]},${randRange[1]}] - All Data`, () => {
    expect(FilterPricePerPoint(data, randRange)).toHaveLength(
      data.filter(
        (x: ResortAdapter) =>
          x.pricePerPoint >= randRange[0] && x.pricePerPoint <= randRange[1]
      ).length
    );
  });
}

//#endregion

//#region Valid Data

// Price

for (let i = 0; i < 10; ++i) {
  const randRange = RandomizeRange(
    validDataRanges.price[0],
    validDataRanges.price[1]
  );

  test(`Price Filter - [${i}/10] - [${randRange[0]},${randRange[1]}]] - Valid Data`, () => {
    expect(FilterPrice(validData, randRange)).toHaveLength(
      validData.filter(
        (x: ResortAdapter) => x.price >= randRange[0] && x.price <= randRange[1]
      ).length
    );
  });
}

//  Points

for (let i = 0; i < 10; ++i) {
  const randRange = RandomizeRange(
    validDataRanges.points[0],
    validDataRanges.points[1]
  );

  test(`Points Filter - [${i}/10] - [${randRange[0]},${randRange[1]}] - Valid Data`, () => {
    expect(FilterPoints(validData, randRange)).toHaveLength(
      validData.filter(
        (x: ResortAdapter) =>
          x.points >= randRange[0] && x.points <= randRange[1]
      ).length
    );
  });
}

// Price Per Point

for (let i = 0; i < 10; ++i) {
  const randRange = RandomizeRange(
    validDataRanges.pricePerPoint[0],
    validDataRanges.pricePerPoint[1]
  );

  test(`Price Filter - [${i}/10] - [${randRange[0]},${randRange[1]}] - Valid Data`, () => {
    expect(FilterPricePerPoint(validData, randRange)).toHaveLength(
      validData.filter(
        (x: ResortAdapter) =>
          x.pricePerPoint >= randRange[0] && x.pricePerPoint <= randRange[1]
      ).length
    );
  });
}

//#endregion
