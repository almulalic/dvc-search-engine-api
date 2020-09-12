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
  test(`Status Filter Test - Simple [${i}/10] - All Data`, () => {
    const number = RandomizeInRange(StatusAlias.size);
    expect(FilterStatus(data, [number])).toHaveLength(
      data.filter((x: ResortAdapter) => x.status === number).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  test(`Status Filter Test - Medium [${i}/10] - All Data`, () => {
    const randArray = Array(StatusAlias.size - 4)
      .fill(0)
      .map((__) => {
        return RandomizeInRange(StatusAlias.size);
      });

    expect(FilterStatus(data, randArray)).toHaveLength(
      data.filter((x: ResortAdapter) => randArray.includes(x.status)).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  test(`Status Filter Test - HC [${i}/10] - All Data`, () => {
    const randArray = Array(StatusAlias.size - 2)
      .fill(0)
      .map((__) => {
        return RandomizeInRange(StatusAlias.size);
      });

    expect(FilterStatus(data, randArray)).toHaveLength(
      data.filter((x: ResortAdapter) => randArray.includes(x.status)).length
    );
  });
}

//#endregion

//#region Valid Data

for (let i = 0; i < 10; ++i) {
  test(`Status Filter Test - Simple [${i}/10] - Valid Data`, () => {
    const number = RandomizeInRange(StatusAlias.size);
    expect(FilterStatus(validData, [number])).toHaveLength(
      validData.filter((x: ResortAdapter) => x.status === number).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  test(`Status Filter Test - Medium [${i}/10] - Valid Data`, () => {
    const randArray = Array(StatusAlias.size - 4)
      .fill(0)
      .map((__) => {
        return RandomizeInRange(StatusAlias.size);
      });

    expect(FilterStatus(validData, randArray)).toHaveLength(
      validData.filter((x: ResortAdapter) => randArray.includes(x.status))
        .length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  test(`Status Filter Test - HC [${i}/10] - Valid Data`, () => {
    const randArray = Array(StatusAlias.size - 2)
      .fill(0)
      .map((__) => {
        return RandomizeInRange(StatusAlias.size);
      });

    expect(FilterStatus(validData, randArray)).toHaveLength(
      validData.filter((x: ResortAdapter) => randArray.includes(x.status))
        .length
    );
  });
}

//#endregion
