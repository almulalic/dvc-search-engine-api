import { ResortAdapter } from "../Enums/Interface";

export const FilterBrokers = (data: ResortAdapter[], brokers: number[]) => {
  return data.filter((x: ResortAdapter) => {
    if (brokers.includes(x.broker)) return x;
  });
};

export const FilterResorts = (data: ResortAdapter[], resorts: number[]) => {
  return data.filter((x: ResortAdapter) => {
    if (resorts.includes(x.resort)) return x;
  });
};

export const FilterUseYears = (data: ResortAdapter[], useyears: number[]) => {
  return data.filter((x: ResortAdapter) => {
    if (useyears.includes(x.useyear)) return x;
  });
};

export const FilterStatus = (data: ResortAdapter[], statuses: number[]) => {
  return data.filter((x: ResortAdapter) => {
    if (statuses.includes(x.broker)) return x;
  });
};
