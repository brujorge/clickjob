const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export function toUSD(number) {
  return USD.format(number);
}

export const formatSalary = salary => {
  const salarySeparator = " - ";
  return salary
    .split(salarySeparator)
    .map(amount => toUSD(amount))
    .join(salarySeparator);
};
