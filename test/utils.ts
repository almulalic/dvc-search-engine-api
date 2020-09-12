export const RandomizeInRange = (size: number) => {
  return Math.floor(Math.random() * size) + 1;
};

export const RandomizeRange = (min: number, max: number) => {
  return [
    Math.floor((Math.random() * min) / 2) + 1,
    Math.floor((Math.random() * max) / 2) + 1,
  ];
};
