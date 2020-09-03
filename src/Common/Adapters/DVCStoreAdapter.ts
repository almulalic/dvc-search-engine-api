import { ResortAdapter } from "../Enums/Interface";
import { ResortAlias, UseYearAlias, StatusAlias } from "../Enums/Aliases";
import { BrokerAlias } from "../Enums/Aliases";
import { NormalizePriceValue } from "../Helpers/Helpers";

export class DVCStoreAdapter implements ResortAdapter {
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

  constructor(raw, href: string, pointavailability: string, broker: string) {
    let RaS = raw[0].split("-"); // Resort and Statuses

    this.id = raw[1];
    this.resort = ResortAlias.get(
      RaS[0]
        .replace("Villas", "")
        .replace("Resort", "")
        .replace("Hawaii", "")
        .trim()
    );
    this.points = Number(raw[3]);
    this.priceperpoint = Number(this.GetPricePerPoint(pointavailability));
    this.useyear = UseYearAlias.get(raw.useyear);
    this.pointavailability = this.NormalizePointAvailablity(pointavailability);
    this.status = StatusAlias.get(RaS[1]) ?? 0;
    this.price = NormalizePriceValue(raw[4]);
    this.href = href ? "https://www.dvcstore.com/" + href : null;
    this.broker = BrokerAlias.get(broker);
  }

  //#endregion

  //#region Public Methods

  //#endregion

  //#region Private Methods

  private NormalizePointAvailablity = (pa) => {
    let dotCount = 0;
    let position = pa.length - 1;

    for (let i = pa.length - 1; i > 0; --i) {
      if (pa[i] === ".") {
        dotCount++;
      }
      if (dotCount === 2) {
        position = i;
        break;
      }
    }

    return pa.slice(0, position).trim();
  };

  private GetPricePerPoint = (pa) => {
    return pa.replace(/(^.+\D)(\d+)(\D.+$)/i, "$2");
  };

  //#endregion
}
