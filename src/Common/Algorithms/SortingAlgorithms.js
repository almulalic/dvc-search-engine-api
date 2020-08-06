exports.SortById = (data, direction) => {
  return data.sort((a, b) => {
    let first = a.id.toUpperCase(),
      second = b.id.toUpperCase();

    if (first < second) return direction == "Ascending" ? -1 : 1;
    if (first > second) return direction == "Ascending" ? 1 : -1;
    return 0;
  });
};

exports.SortByResort = (data, direction) => {
  return data.sort((a, b) => {
    let first = a.resort.toUpperCase(),
      second = b.resort.toUpperCase();

    if (first < second) return direction == "Ascending" ? -1 : 1;
    if (first > second) return direction == "Ascending" ? 1 : -1;
    return 0;
  });
};

exports.SortByPoints = (data, direction) => {
  return data.sort((a, b) => {
    return direction == "Ascending" ? a.points - b.points : b.points - a.points;
  });
};

const dvcMarketOrder = [
  "DVC Resale Market",
  "Resales DVC",
  "DVC Store",
  "DVC Resales Shop",
  "DVC Resales",
];
exports.SortByDVCMarket = (data, direction) => {
  return data.sort((a, b) => {
    return direction == "Ascending"
      ? dvcMarketOrder.indexOf(a.dvcmarket) -
          dvcMarketOrder.indexOf(b.dvcmarket)
      : dvcMarketOrder.indexOf(b.dvcmarket) -
          dvcMarketOrder.indexOf(a.dvcmarket);
  });
};

const useYearOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
exports.SortByUseYear = (data, direction) => {
  return data.sort((a, b) => {
    return direction == "Ascending"
      ? useYearOrder.indexOf(a.useyear) - useYearOrder.indexOf(b.useyear)
      : useYearOrder.indexOf(b.useyear) - useYearOrder.indexOf(a.useyear);
  });
};

exports.SortByPrice = (data, direction) => {
  return data.sort((a, b) => {
    return direction == "Ascending" ? a.price - b.price : b.price - a.price;
  });
};
