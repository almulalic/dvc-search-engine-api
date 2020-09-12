import fs from "fs";
import path from "path";

import { ResortAdapter } from "../../src/Common/Types/Interface";

import { FilterUseYears } from "../../src/Common/Algorithms/FilterAlgorithms";
import { UseYearAlias } from "../../src/Common/Types/Aliases";
import { RandomizeInRange } from "../utils";

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

//#region All Data

for (let i = 0; i < 10; ++i) {
  test(`Use Year Filter Test - Simple [${i}/10] - All Data`, () => {
    const number = RandomizeInRange(UseYearAlias.size);
    expect(FilterUseYears(data, [number])).toHaveLength(
      data.filter((x: ResortAdapter) => x.useyear === number).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  test(`Use Year Filter Test - Medium [${i}/10] - All Data`, () => {
    const randArray = Array(UseYearAlias.size - 4)
      .fill(0)
      .map((__) => {
        return RandomizeInRange(UseYearAlias.size);
      });

    expect(FilterUseYears(data, randArray)).toHaveLength(
      data.filter((x: ResortAdapter) => randArray.includes(x.useyear)).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  test(`Use Year Filter Test - HC [${i}/10] - All Data`, () => {
    const randArray = Array(UseYearAlias.size - 2)
      .fill(0)
      .map((__) => {
        return RandomizeInRange(UseYearAlias.size);
      });

    expect(FilterUseYears(data, randArray)).toHaveLength(
      data.filter((x: ResortAdapter) => randArray.includes(x.useyear)).length
    );
  });
}

//#endregion

//#region Valid Data

for (let i = 0; i < 10; ++i) {
  test(`Use Year Filter Test - Simple [${i}/10] - Valid Data`, () => {
    const number = RandomizeInRange(UseYearAlias.size);
    expect(FilterUseYears(validData, [number])).toHaveLength(
      validData.filter((x: ResortAdapter) => x.useyear === number).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  test(`Use Year Filter Test - Medium [${i}/10] - Valid Data`, () => {
    const randArray = Array(UseYearAlias.size - 4)
      .fill(0)
      .map((__) => {
        return RandomizeInRange(UseYearAlias.size);
      });

    expect(FilterUseYears(data, randArray)).toHaveLength(
      data.filter((x: ResortAdapter) => randArray.includes(x.useyear)).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  test(`Use Year Filter Test - HC [${i}/10] - Valid Data`, () => {
    const randArray = Array(UseYearAlias.size - 2)
      .fill(0)
      .map((__) => {
        return RandomizeInRange(UseYearAlias.size);
      });

    expect(FilterUseYears(data, randArray)).toHaveLength(
      data.filter((x: ResortAdapter) => randArray.includes(x.useyear)).length
    );
  });
}

//#endregion
