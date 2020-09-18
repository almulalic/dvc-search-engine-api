import fs from "fs";
import path from "path";

import { ResortAdapter } from "../../src/Common/Types/Interface";

import { FilterBrokers } from "../../src/Common/Algorithms/FilterAlgorithms";
import { BrokerAlias } from "../../src/Common/Types/Aliases";
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
  const number = RandomizeInRange(BrokerAlias.size);

  test(`Broker Filter Test - Simple [${i}/10] - Input: ${number} - All Data`, () => {
    expect(FilterBrokers(data, [number])).toHaveLength(
      data.filter((x: ResortAdapter) => x.broker === number).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  const randArray = Array(BrokerAlias.size - 4)
    .fill(0)
    .map((__) => {
      return RandomizeInRange(BrokerAlias.size);
    });

  test(`Broker Filter Test - Medium [${i}/10] - Input: ${randArray} - All Data`, () => {
    expect(FilterBrokers(data, randArray)).toHaveLength(
      data.filter((x: ResortAdapter) => randArray.includes(x.broker)).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  const randArray = Array(BrokerAlias.size - 2)
    .fill(0)
    .map((__) => {
      return RandomizeInRange(BrokerAlias.size);
    });

  test(`Broker Filter Test - HC [${i}/10] - Input: ${randArray} - All Data`, () => {
    expect(FilterBrokers(data, randArray)).toHaveLength(
      data.filter((x: ResortAdapter) => randArray.includes(x.broker)).length
    );
  });
}

//#endregion

//#region Valid Data

for (let i = 0; i < 10; ++i) {
  const number = RandomizeInRange(BrokerAlias.size);

  test(`Broker Filter Test - Simple [${i}/10] - Input: ${number} - Valid Data`, () => {
    expect(FilterBrokers(validData, [number])).toHaveLength(
      validData.filter((x: ResortAdapter) => x.broker === number).length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  const randArray = Array(BrokerAlias.size - 4)
    .fill(0)
    .map((__) => {
      return RandomizeInRange(BrokerAlias.size);
    });

  test(`Broker Filter Test - Medium [${i}/10] - Input: ${randArray} - Valid Data`, () => {
    expect(FilterBrokers(validData, randArray)).toHaveLength(
      validData.filter((x: ResortAdapter) => randArray.includes(x.broker))
        .length
    );
  });
}

for (let i = 0; i < 10; ++i) {
  const randArray = Array(BrokerAlias.size - 2)
    .fill(0)
    .map((__) => {
      return RandomizeInRange(BrokerAlias.size);
    });

  test(`Broker Filter Test - HC [${i}/10] - Input: ${randArray} - Valid Data`, () => {
    expect(FilterBrokers(validData, randArray)).toHaveLength(
      validData.filter((x: ResortAdapter) => randArray.includes(x.broker))
        .length
    );
  });
}

//#endregion
