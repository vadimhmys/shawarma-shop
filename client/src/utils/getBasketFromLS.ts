export const getBasketFromLS = () => {
  const data = localStorage.getItem('shawarmaBasket');
  return data ? JSON.parse(data) : [];
};