export class ResortAdapter {
  id: number;
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
  id: number;
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
  | "useYear"
  | "price";
export type OrderDirection = "ASC" | "DESC";

export interface FilterBody {
  broker: number[];
  resort: number[];
  useYear: number[];
  status: number[];
  itemsPerPage: number;
  page: number;
  sidx: SortIdx;
  sord: OrderDirection;
}
