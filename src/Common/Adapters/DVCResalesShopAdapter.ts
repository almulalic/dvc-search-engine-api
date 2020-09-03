import { ResortAdapter } from "../Enums/Interface";
import { NormalizePriceValue } from "../Helpers/Helpers";
import { BrokerAlias } from "../Enums/Aliases";

import {
  ResortAlias,
  DateAlias,
  UseYearAlias,
  StatusAlias,
} from "../Enums/Aliases";

export class DVCResalesShopAdapter implements ResortAdapter {
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

  constructor(raw, href, broker: string) {
    this.id = raw[7].split(" ")[2].trim();
    this.resort = ResortAlias.get(raw[0]);
    this.points = Number(raw[1]);
    this.priceperpoint = NormalizePriceValue(raw[4]);
    this.useyear = UseYearAlias.get(DateAlias.get(raw[3]));
    this.pointavailability = raw[2];
    this.status = StatusAlias.get(raw[6]) ?? 0;
    this.price = NormalizePriceValue(raw[5]);
    this.href = href ?? null;
    this.broker = BrokerAlias.get(broker);
  }

  //#endregion

  //#region Public Methods

  //#endregion

  //#region Private Methods

  //#endregion
}
