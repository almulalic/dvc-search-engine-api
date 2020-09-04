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
  price: number;
  priceperpoint: number;
  pointavailability: string;
  useyear: number;
  status: number;
  href: string;
  broker: number;

  //#endregion

  //#region Constructor

  constructor(raw, href: string, broker: string) {
    this.id = raw[7].split(" ")[2].trim();
    this.resort = ResortAlias.get(
      raw[0]
        .replace("Villas", "")
        .replace("Hawaii", "")
        .replace("Resort", "")
        .trim()
    );
    this.points = Number(raw[1]);
    this.price = NormalizePriceValue(raw[5]);
    this.priceperpoint = NormalizePriceValue(raw[4]);
    this.pointavailability = raw[2];
    this.useyear = UseYearAlias.get(DateAlias.get(raw[3]));
    this.status = StatusAlias.get(raw[6]) ?? 0;
    this.href = href ?? null;
    this.broker = BrokerAlias.get(broker);
  }

  //#endregion

  //#region Public Methods

  //#endregion

  //#region Private Methods

  //#endregion
}
