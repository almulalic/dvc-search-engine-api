exports.FilterMarkets = (data, markets) => {
  let sorted = [];
  data.forEach((x) => {
    if (markets.includes(x.market)) sorted.push(x);
  });

  return sorted;
};

exports.FilterResorts = (data, resorts) => {
  let sorted = [];
  data.forEach((x) => {
    if (resorts.includes(x.resort)) sorted.push(x);
  });

  return sorted;
};

exports.FilterUseYears = (data, useyears) => {
  let sorted = [];
  data.forEach((x) => {
    if (useyears.includes(x.useyear)) sorted.push(x);
  });

  return sorted;
};

exports.FilterStatus = (data, statuses) => {
  let sorted = [];
  console.log(statuses);
  data.forEach((x) => {
    if (statuses.includes(x.statusname)) sorted.push(x);
  });

  return sorted;
};