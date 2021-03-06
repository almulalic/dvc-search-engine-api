import { ResortAdapter } from "../Types/Interface";
import { NormalizePriceValue } from "../Helpers/Helpers";
import { ResortAlias, DateAlias, UseYearAlias, StatusAlias } from "../Types/Aliases";
import { ResortRawAdapter } from "../Types/Interface";
import { BrokerAlias } from "../Types/Aliases";

export class DVCResaleMarketAdapter implements ResortAdapter {
  //#region Properties

  id: string;
  resort: number;
  points: number;
  price: number;
  pricePerPoint: number;
  pointAvailability: string;
  useYear: number;
  status: number;
  href: string;
  broker: number;

  //#endregion

  //#region Constructor

  constructor(raw: ResortRawAdapter, broker: string) {
    this.id = raw.id;
    this.resort = ResortAlias.get(raw.resort.trim().replace("Resort", ""));
    this.points = Number(raw.points);
    this.price = raw.price;
    this.pricePerPoint = raw.priceperpoint;
    this.pointAvailability = raw.pointavailability?.toString().replace("\n", " ");
    this.useYear = UseYearAlias.get(raw.useyear);
    this.status = StatusAlias.get(raw.status) ?? 0;
    this.href = raw.href ?? null;
    this.broker = BrokerAlias.get(broker);
  }

  //#endregion

  //#region Public Methods

  //#endregion

  //#region Private Methods

  //#endregion
}
