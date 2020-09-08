import { ResortAdapter } from "../Enums/Interface";
import { NormalizePriceValue } from "../Helpers/Helpers";
import {
  ResortAlias,
  DateAlias,
  UseYearAlias,
  StatusAlias,
} from "../Enums/Aliases";
import { ResortRawAdapter } from "../Enums/Interface";
import { BrokerAlias } from "../Enums/Aliases";

export class DVCResaleMarketAdapter implements ResortAdapter {
  //#region Properties

  id: string;
  resort: number;
  points: number;
  price: number;
  priceperpoint: number;
  pointavailability: string;
  useyear: number;
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
    this.priceperpoint = raw.priceperpoint;
    this.pointavailability = raw.pointavailability?.toString();
    this.useyear = UseYearAlias.get(raw.useyear);
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
