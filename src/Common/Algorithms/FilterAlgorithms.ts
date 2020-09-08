import { ResortAdapter } from "../Types/Interface";

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
    if (statuses.includes(x.status)) return x;
  });
};

export const FilterPoints = (data: ResortAdapter[], pointsRange: number[]) => {
  return data.filter((x: ResortAdapter) => {
    if (x.points >= pointsRange[0] && x.points <= pointsRange[1]) return x;
  });
};

export const FilterPrice = (data: ResortAdapter[], priceRange: number[]) => {
  return data.filter((x: ResortAdapter) => {
    if (x.price >= priceRange[0] && x.price <= priceRange[1]) return x;
  });
};

export const FilterPricePerPoint = (
  data: ResortAdapter[],
  pricePerPointRange: number[]
) => {
  return data.filter((x: ResortAdapter) => {
    if (
      x.priceperpoint >= pricePerPointRange[0] &&
      x.priceperpoint <= pricePerPointRange[1]
    )
      return x;
  });
};

export const FilterId = (data: ResortAdapter[], idInput: string) => {
  return data.filter((x: ResortAdapter) => {
    if (x.id.toLowerCase().includes(idInput.toLowerCase())) return x;
  });
};
