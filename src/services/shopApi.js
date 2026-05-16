const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

function buildDeliveryCommands(playerName, items) {
  return items.flatMap((item) =>
    Array.from({ length: item.quantity }, () =>
      item.product.delivery.command.replace("{player}", playerName),
    ),
  );
}

export async function addProductToCart(product) {
  return {
    ok: true,
    item: product,
    message: "Товар добавлен в корзину",
  };
}

export async function createCheckoutSession({ playerName, items, total }) {
  await wait(450);

  return {
    id: `FB-${Date.now().toString(36).toUpperCase()}`,
    playerName,
    items,
    total,
    paymentProvider: "demo",
    status: "created",
    paymentUrl: "#demo-payment",
    deliveryCommands: buildDeliveryCommands(playerName, items),
  };
}

export async function completeDemoPayment(order) {
  await wait(850);

  return {
    ...order,
    status: "paid",
    paidAt: new Date().toISOString(),
  };
}

export async function issueDemoDonation(order) {
  await wait(750);

  return {
    ...order,
    status: "issued",
    issuedAt: new Date().toISOString(),
  };
}
