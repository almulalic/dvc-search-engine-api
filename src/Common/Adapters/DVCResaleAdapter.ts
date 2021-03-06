import { ResortAdapter } from "../Types/Interface";
import { NormalizePriceValue } from "../Helpers/Helpers";
import { UseYearAlias, StatusAlias } from "../Types/Aliases";
import { BrokerAlias } from "../Types/Aliases";

export class DVCResaleAdapter implements ResortAdapter {
  //#region Properties

  id: string;
  resort: number;
  points: number;
  price: number;
  pricePerPoint: number;
  useYear: number;
  pointAvailability: string;
  status: number;
  href: string;
  broker: number;

  #CustomResortAlias = new Map([
    ["Animal Kingdom", 0],
    ["Aulani A Disney Resort & Spa", 1],
    ["Bay Lake Tower at Disneys Contemporary Resort", 2],
    ["Disneys Beach Club Resort", 3],
    ["Disneys BoardWalk Villas", 4],
    ["Boulder Ridge Wilderness Lodge", 5],
    ["Copper Creek Wilderness Lodge", 6],
    ["Disneys Grand Californian Resort & Spa", 7],
    ["Disneys Grand Floridian Resort & Spa", 8],
    ["Disneys Hilton Head Island Resort", 9],
    ["Disneys Old Key West Resort", 10],
    ["Disneys Polynesian Village Resort", 11],
    ["Riviera", 12],
    ["Disneys Saratoga Springs Resort & Spa", 13],
    ["Disneys Vero Beach Resort", 14],
  ]);

  //#endregion

  //#region Constructor

  constructor(raw, href: string, broker: string) {
    this.id = raw[0];
    this.resort = this.#CustomResortAlias.get(raw[1].trim().trim());
    this.points = Number(raw[2]);
    this.price = NormalizePriceValue(raw[8]);
    this.pricePerPoint = NormalizePriceValue(raw[7]);
    this.pointAvailability = "Not provided by broker.";
    this.useYear = UseYearAlias.get(raw[3]);
    this.status = StatusAlias.get(raw[9]) ?? 0;
    this.href = href ?? null;
    this.broker = BrokerAlias.get(broker);
  }

  //#endregion

  //#region Public Methods

  //#endregion

  //#region Private Methods

  //#endregion
}
