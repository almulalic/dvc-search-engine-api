export const RandomizeInRange = (size: number) => {
  return Math.floor(Math.random() * size) + 1;
};

export const RandomizeRange = (min: number, max: number) => {
  const randMax = Math.floor(Math.random() * (max - min + 1) + min);
  return [Math.floor(Math.random() * (randMax - min + 1) + min), randMax].sort(
    (a, b) => {
      return a - b;
    }
  );
};

export const GenerateDummyData = (randomizationFactor: number) => {
  return Array(Math.floor(Math.random() * 10 + 1) * randomizationFactor).fill({
    test: "test",
  });
};
