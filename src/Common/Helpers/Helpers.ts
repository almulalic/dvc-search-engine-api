export const NormalizePriceValue = (textValue) => {
  return parseFloat(textValue.replace("$", "").replace(",", ""));
};
