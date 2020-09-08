export const MaxAndMinRanges = (data) => {
  let maxPoints = 0,
    minPoints = 0;
  let maxPrice = 0,
    minPrice = 0;
  let minPricePerPoint = 0,
    maxPricePerPoint = 0;

  data.forEach((x) => {
    if (x.points > maxPoints) maxPoints = x.points;
    if (x.points < minPoints) minPoints = x.points;

    if (x.price > maxPrice) maxPrice = x.price;
    if (x.points < minPrice) minPrice = x.price;

    if (x.priceperpoint > maxPricePerPoint) maxPricePerPoint = x.priceperpoint;
    if (x.priceperpoint < minPricePerPoint) minPricePerPoint = x.priceperpoint;
  });

  return {
    points: [minPoints, maxPoints],
    price: [minPrice, maxPrice],
    pricePerPoint: [minPricePerPoint, maxPricePerPoint],
  };
};
