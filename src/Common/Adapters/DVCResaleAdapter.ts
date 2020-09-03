import { ResortAdapter } from "../Enums/Interface";
import { NormalizePriceValue } from "../Helpers/Helpers";
import { ResortAlias, UseYearAlias, StatusAlias } from "../Enums/Aliases";
import { BrokerAlias } from "../Enums/Aliases";

export class DVCResaleAdapter implements ResortAdapter {
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
    this.resort = ResortAlias.get(raw[1]);
    this.points = Number(raw[2]);
    this.priceperpoint = NormalizePriceValue(raw[7]);
    this.useyear = UseYearAlias.get(raw[3]);
    this.pointavailability = null;
    this.status = StatusAlias.get(raw[9]) ?? 0;
    this.price = NormalizePriceValue(raw[8]);
    this.href = href ?? null;
    this.broker = BrokerAlias.get(broker);
  }

  //#endregion

  //#region Public Methods

  //#endregion

  //#region Private Methods

  //#endregion
}
