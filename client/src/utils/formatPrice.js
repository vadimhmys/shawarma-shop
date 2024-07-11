export function formatPrice(price) {
  let formatter = new Intl.NumberFormat('ru', {
    minimumFractionDigits: 2,
  });

  return formatter.format(price);
}