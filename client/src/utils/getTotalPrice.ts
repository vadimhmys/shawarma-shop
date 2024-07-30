import { BasketItemType } from "../redux/basket/types";

export function getTotalPrice(items: BasketItemType[]): string {
  const totalPrice = items.reduce(
    (sum: number, item: BasketItemType) => sum + item.count * parseFloat(item.price.replace(',', '.')),
    0,
  );
  let formatter = new Intl.NumberFormat('ru', {
    minimumFractionDigits: 2,
  });

  return formatter.format(totalPrice);
}