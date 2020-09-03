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

  id: number;
  resort: number;
  points: number;
  priceperpoint: number;
  useyear: number;
  pointavailability: string;
  price: number;
  status: number;
  href: string;
  broker: number;

  //#endregion

  //#region Constructor

  constructor(raw: ResortRawAdapter, broker: string) {
    this.id = raw.id;
    this.resort = ResortAlias.get(raw.resort);
    this.points = Number(raw.points);
    this.priceperpoint = raw.priceperpoint;
    this.useyear = UseYearAlias.get(DateAlias.get(raw.useyear));
    this.pointavailability = raw.pointavailability;
    this.status = StatusAlias.get(raw.status) ?? 0;
    this.price = raw.price;
    this.href = raw.href ?? null;
    this.broker = BrokerAlias.get(broker);
  }

  //#endregion

  //#region Public Methods

  //#endregion

  //#region Private Methods

  //#endregion
}
