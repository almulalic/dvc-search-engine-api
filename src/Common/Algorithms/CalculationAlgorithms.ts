import { ResortAdapter } from "./../Types/Interface";

export const MaxAndMinRanges = (data) => {
  let maxPoints = 0,
    minPoints = 0;
  let maxPrice = 0,
    minPrice = 0;
  let minPricePerPoint = 0,
    maxPricePerPoint = 0;

  data.forEach((x: ResortAdapter) => {
    if (x.points > maxPoints) maxPoints = x.points;
    if (x.points < minPoints) minPoints = x.points;

    if (x.price > maxPrice) maxPrice = x.price;
    if (x.points < minPrice) minPrice = x.price;

    if (x.pricePerPoint > maxPricePerPoint) maxPricePerPoint = x.pricePerPoint;
    if (x.pricePerPoint < minPricePerPoint) minPricePerPoint = x.pricePerPoint;
  });

  return {
    points: [minPoints, maxPoints],
    price: [minPrice, maxPrice],
    pricePerPoint: [minPricePerPoint, maxPricePerPoint],
  };
};
