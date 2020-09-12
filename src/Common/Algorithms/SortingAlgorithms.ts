import { ResortAdapter } from "../Types/Interface";

export const SortById = (data: ResortAdapter[], ascending: boolean) => {
  return data.sort((a: ResortAdapter, b: ResortAdapter) => {
    let first = a.id.toUpperCase(),
      second = b.id.toUpperCase();

    if (first < second) return ascending ? -1 : 1;
    if (first > second) return ascending ? 1 : -1;
    return 0;
  });
};

export const SortByResort = (data: ResortAdapter[], ascending: boolean) => {
  return data.sort((a: ResortAdapter, b: ResortAdapter) => {
    return ascending ? a.resort - b.resort : b.resort - a.resort;
  });
};

export const SortByPoints = (data: ResortAdapter[], ascending: boolean) => {
  return data.sort((a: ResortAdapter, b: ResortAdapter) => {
    return ascending ? a.points - b.points : b.points - a.points;
  });
};

export const SortByBroker = (data: ResortAdapter[], ascending: boolean) => {
  return data.sort((a: ResortAdapter, b: ResortAdapter) => {
    return ascending ? a.broker - b.broker : b.broker - a.broker;
  });
};

const useYearOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const SortByUseYear = (data: ResortAdapter[], ascending: boolean) => {
  return data.sort((a: ResortAdapter, b: ResortAdapter) => {
    return ascending
      ? useYearOrder.indexOf(a.useYear.toString()) -
          useYearOrder.indexOf(b.useYear.toString())
      : useYearOrder.indexOf(b.useYear.toString()) -
          useYearOrder.indexOf(a.useYear.toString());
  });
};

export const SortByPrice = (data: ResortAdapter[], ascending: boolean) => {
  return data.sort((a: ResortAdapter, b: ResortAdapter) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
};

export const SortByPricePerPoint = (
  data: ResortAdapter[],
  ascending: boolean
) => {
  return data.sort((a: ResortAdapter, b: ResortAdapter) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
};
