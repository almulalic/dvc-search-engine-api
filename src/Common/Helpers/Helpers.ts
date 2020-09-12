export const NormalizePriceValue = (textValue: string) => {
  return parseFloat(textValue.replace("$", "").replace(",", ""));
};
