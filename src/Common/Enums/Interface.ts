export class ResortAdapter {
  id: string;
  resort: number;
  price: number;
  points: number;
  priceperpoint: number;
  pointavailability: string;
  useyear: number;
  status: number;
  href: string;
  broker: number;
}

export class ResortRawAdapter {
  id: string;
  resort: string;
  points: number;
  price: number;
  priceperpoint: number;
  pointavailability: string;
  useyear: string;
  statusname: string;
  href: string;
  broker: string;
}

export type SortIdx =
  | "id"
  | "broker"
  | "resort"
  | "points"
  | "pricePerPoint"
  | "useYear"
  | "price";

export type OrderDirection = "ASC" | "DESC";

export interface FilterBody {
  broker: number[];
  resort: number[];
  useYear: number[];
  status: number[];
  pointsRange: number[];
  priceRange: number[];
  pricePerPointRange: number[];
  idInput: string;
  sidx: SortIdx;
  sord: OrderDirection;
  itemsPerPage: number;
  includeDefectiveData: boolean;
  currentPage: number;
}
