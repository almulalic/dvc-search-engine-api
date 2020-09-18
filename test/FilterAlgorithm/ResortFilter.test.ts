import fs from "fs";
import path from "path";

import { ResortAdapter } from "../../src/Common/Types/Interface";

import { FilterResorts } from "../../src/Common/Algorithms/FilterAlgorithms";
import { ResortAlias } from "../../src/Common/Types/Aliases";
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
  const number = RandomizeInRange(ResortAlias.size);

  test(`Resort Filter Test - Simple [${i}/10] - Input: ${number} - All Data`, () => {
    expect(FilterResorts(data, [number])).toHaveLength(
      data.filter((x: ResortAdapter) => x.resort === number).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  const randArray = Array(ResortAlias.size - 4)
    .fill(0)
    .map((__) => {
      return RandomizeInRange(ResortAlias.size);
    });

  test(`Resort Filter Test - Medium [${i}/10] - Input: ${randArray} - All Data`, () => {
    expect(FilterResorts(data, randArray)).toHaveLength(
      data.filter((x: ResortAdapter) => randArray.includes(x.resort)).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  const randArray = Array(ResortAlias.size - 2)
    .fill(0)
    .map((__) => {
      return RandomizeInRange(ResortAlias.size);
    });

  test(`Resort Filter Test - HC [${i}/10]- Input: ${randArray} - All Data`, () => {
    expect(FilterResorts(data, randArray)).toHaveLength(
      data.filter((x: ResortAdapter) => randArray.includes(x.resort)).length
    );
  });
}

//#endregion

//#region Valid Data

for (let i = 0; i < 10; ++i) {
  const number = RandomizeInRange(ResortAlias.size);

  test(`Resort Filter Test - Simple [${i}/10] - Input: ${number} - Valid Data`, () => {
    expect(FilterResorts(validData, [number])).toHaveLength(
      validData.filter((x: ResortAdapter) => x.resort === number).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  const randArray = Array(ResortAlias.size - 4)
    .fill(0)
    .map((__) => {
      return RandomizeInRange(ResortAlias.size);
    });

  test(`Resort Filter Test - Medium [${i}/10] - Input: ${randArray} - Valid Data`, () => {
    expect(FilterResorts(validData, randArray)).toHaveLength(
      validData.filter((x: ResortAdapter) => randArray.includes(x.resort))
        .length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  const randArray = Array(ResortAlias.size - 2)
    .fill(0)
    .map((__) => {
      return RandomizeInRange(ResortAlias.size);
    });

  test(`Resort Filter Test - HC [${i}/10] - Input: ${randArray} - Valid Data`, () => {
    expect(FilterResorts(validData, randArray)).toHaveLength(
      validData.filter((x: ResortAdapter) => randArray.includes(x.resort))
        .length
    );
  });
}

//#endregion
