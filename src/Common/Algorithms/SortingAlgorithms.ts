export const SortById = (data, ascending) => {
  return data.sort((a, b) => {
    let first = a.id.toUpperCase(),
      second = b.id.toUpperCase();

    if (first < second) return ascending ? -1 : 1;
    if (first > second) return ascending ? 1 : -1;
    return 0;
  });
};

export const SortByResort = (data, ascending) => {
  return data.sort((a, b) => {
    return ascending ? a.resort - b.resort : b.resort - a.resort;
  });
};

export const SortByPoints = (data, ascending) => {
  return data.sort((a, b) => {
    return ascending ? a.points - b.points : b.points - a.points;
  });
};

export const SortByBroker = (data, ascending) => {
  return data.sort((a, b) => {
    return ascending ? a.broker - b.broker : b.broker - a.broker;
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

export const SortByUseYear = (data, ascending) => {
  return data.sort((a, b) => {
    return ascending
      ? useYearOrder.indexOf(a.useyear) - useYearOrder.indexOf(b.useyear)
      : useYearOrder.indexOf(b.useyear) - useYearOrder.indexOf(a.useyear);
  });
};

export const SortByPrice = (data, ascending) => {
  return data.sort((a, b) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
};
