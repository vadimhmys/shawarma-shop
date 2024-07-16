export function formatPrice(price: number): string {
  let formatter = new Intl.NumberFormat('ru', {
    minimumFractionDigits: 2,
  });

  return formatter.format(price);
}