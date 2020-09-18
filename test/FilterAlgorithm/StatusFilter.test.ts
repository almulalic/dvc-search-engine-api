import fs from "fs";
import path from "path";

import { ResortAdapter } from "../../src/Common/Types/Interface";

import { FilterStatus } from "../../src/Common/Algorithms/FilterAlgorithms";
import { StatusAlias } from "../../src/Common/Types/Aliases";
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
  const number = RandomizeInRange(StatusAlias.size);

  test(`Status Filter Test - Simple [${i}/10] - Input: ${number} - All Data`, () => {
    expect(FilterStatus(data, [number])).toHaveLength(
      data.filter((x: ResortAdapter) => x.status === number).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  const randArray = Array(StatusAlias.size - 4)
    .fill(0)
    .map((__) => {
      return RandomizeInRange(StatusAlias.size);
    });

  test(`Status Filter Test - Medium [${i}/10] - Input: ${randArray} - All Data`, () => {
    expect(FilterStatus(data, randArray)).toHaveLength(
      data.filter((x: ResortAdapter) => randArray.includes(x.status)).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  const randArray = Array(StatusAlias.size - 2)
    .fill(0)
    .map((__) => {
      return RandomizeInRange(StatusAlias.size);
    });

  test(`Status Filter Test - HC [${i}/10] - Input: ${randArray} - All Data`, () => {
    expect(FilterStatus(data, randArray)).toHaveLength(
      data.filter((x: ResortAdapter) => randArray.includes(x.status)).length
    );
  });
}

//#endregion

//#region Valid Data

for (let i = 0; i < 10; ++i) {
  const number = RandomizeInRange(StatusAlias.size);

  test(`Status Filter Test - Simple [${i}/10] - Input: ${number} - Valid Data`, () => {
    expect(FilterStatus(validData, [number])).toHaveLength(
      validData.filter((x: ResortAdapter) => x.status === number).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  const randArray = Array(StatusAlias.size - 4)
    .fill(0)
    .map((__) => {
      return RandomizeInRange(StatusAlias.size);
    });

  test(`Status Filter Test - Medium [${i}/10] - Input: ${randArray} - Valid Data`, () => {
    expect(FilterStatus(validData, randArray)).toHaveLength(
      validData.filter((x: ResortAdapter) => randArray.includes(x.status))
        .length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  const randArray = Array(StatusAlias.size - 2)
    .fill(0)
    .map((__) => {
      return RandomizeInRange(StatusAlias.size);
    });

  test(`Status Filter Test - HC [${i}/10] - Input: ${randArray} - Valid Data`, () => {
    expect(FilterStatus(validData, randArray)).toHaveLength(
      validData.filter((x: ResortAdapter) => randArray.includes(x.status))
        .length
    );
  });
}

//#endregion
