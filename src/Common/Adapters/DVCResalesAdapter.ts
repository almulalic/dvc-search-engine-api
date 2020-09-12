import { ResortAdapter } from "../Types/Interface";
import { NormalizePriceValue } from "../Helpers/Helpers";
import {
  ResortAlias,
  DateAlias,
  UseYearAlias,
  StatusAlias,
  BrokerAlias,
} from "../Types/Aliases";

export class DVCResalesAdapter implements ResortAdapter {
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
    this.id = raw[0];
    this.resort =
      ResortAlias.get(raw[1]) ??
      ResortAlias.get(
        raw[1]
          .replace("Villas", "")
          .replace("Hawaii", "")
          .replace("Resort", "")
          .trim()
      );
    this.points = Number(raw[2]);
    this.price = raw[6][0] === "$" ? NormalizePriceValue(raw[6]) : 0;
    this.pricePerPoint = NormalizePriceValue(raw[3]);
    this.pointAvailability = raw[5]?.toString();
    this.useYear = UseYearAlias.get(DateAlias.get(raw[4]));
    this.status = StatusAlias.get(raw.status) ?? 0;
    this.href = href ?? null;
    this.broker = BrokerAlias.get(broker);
  }

  //#endregion

  //#region Public Methods

  //#endregion

  //#region Private Methods

  //#endregion
}
