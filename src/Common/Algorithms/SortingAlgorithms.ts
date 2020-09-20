import { ResortAdapter } from "../Types/Interface";

export const SortById = (data: ResortAdapter[], ascending: boolean) => {
  return data.sort((a: ResortAdapter, b: ResortAdapter) => {
    return a.id.localeCompare(b.id);
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

export const SortByUseYear = (data: ResortAdapter[], ascending: boolean) => {
  return data.sort((a: ResortAdapter, b: ResortAdapter) => {
    return ascending ? a.useYear - b.useYear : b.useYear - a.useYear;
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
    return ascending
      ? a.pricePerPoint - b.pricePerPoint
      : b.pricePerPoint - a.pricePerPoint;
  });
};
