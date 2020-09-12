import { ResortAdapter } from "../Types/Interface";
import { NormalizePriceValue } from "../Helpers/Helpers";
import { BrokerAlias } from "../Types/Aliases";

import {
  ResortAlias,
  DateAlias,
  UseYearAlias,
  StatusAlias,
} from "../Types/Aliases";

export class DVCResalesShopAdapter implements ResortAdapter {
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
    this.pricePerPoint = NormalizePriceValue(raw[4]);
    this.pointAvailability = raw[2].toString();
    this.useYear = UseYearAlias.get(
      DateAlias.get(raw[3].substring(0, 3).trim())
    );
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
