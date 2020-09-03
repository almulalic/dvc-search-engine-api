import { ResortAdapter } from "../Enums/Interface";
import { NormalizePriceValue } from "../Helpers/Helpers";
import {
  ResortAlias,
  DateAlias,
  UseYearAlias,
  StatusAlias,
  BrokerAlias,
} from "../Enums/Aliases";

export class DVCResalesAdapter implements ResortAdapter {
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

  constructor(raw, href: string, broker: string) {
    this.id = raw[0];
    this.resort =
      ResortAlias.get(raw[1]) ??
      ResortAlias.get(
        raw[1]
          .replace("Villas", "")
          .replace("Resort", "")
          .replace("Hawaii", "")
          .trim()
      );
    this.points = Number(raw[2]);
    this.priceperpoint = NormalizePriceValue(raw[3]);
    this.useyear = UseYearAlias.get(DateAlias.get(raw[4]));
    this.pointavailability = raw[5];
    this.status = StatusAlias.get(raw.status) ?? 0;
    this.price = raw[6][0] === "$" ? NormalizePriceValue(raw[6]) : 0;
    this.href = href ?? null;
    this.broker = BrokerAlias.get(broker);
  }

  //#endregion

  //#region Public Methods

  //#endregion

  //#region Private Methods
  //#endregion
}
