export async function addProductToCart(product) {
  return {
    ok: true,
    item: product,
    message: "Товар добавлен в корзину",
  };
}
