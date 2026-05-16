import React from "react";
import ProductIcon from "./ProductIcon.jsx";

const checkoutLabels = {
  idle: "Ожидает оформления",
  creating: "Создаем заказ",
  payment: "Демо-оплата",
  paid: "Оплата подтверждена",
  issuing: "Выдача на сервер",
  issued: "Выдано",
};

export default function CartDrawer({
  isOpen,
  items,
  total,
  playerName,
  checkoutState,
  lastOrder,
  onClose,
  onPlayerNameChange,
  onUpdateQuantity,
  onRemove,
  onClear,
  onCheckout,
}) {
  const hasItems = items.length > 0;
  const isBusy = ["creating", "payment", "paid", "issuing"].includes(checkoutState);

  return (
    <div className={isOpen ? "cart-layer open" : "cart-layer"} aria-hidden={!isOpen}>
      <button className="cart-backdrop" type="button" onClick={onClose} tabIndex={isOpen ? 0 : -1} />

      <aside className="cart-drawer" aria-label="Корзина">
        <div className="cart-head">
          <div>
            <p className="section-kicker">FeverBox checkout</p>
            <h2>Корзина</h2>
          </div>
          <button className="icon-button close-button" type="button" onClick={onClose} aria-label="Закрыть корзину">
            <span aria-hidden="true" />
          </button>
        </div>

        <label className="player-field">
          <span>Ник игрока</span>
          <input
            value={playerName}
            onChange={(event) => onPlayerNameChange(event.target.value)}
            placeholder="Например, Steve"
            autoComplete="nickname"
            disabled={isBusy}
          />
        </label>

        <div className="checkout-steps" aria-label="Статус заказа">
          {["creating", "payment", "issuing", "issued"].map((step) => (
            <span
              className={
                checkoutState === step || (checkoutState === "paid" && step === "issuing")
                  ? "checkout-step active"
                  : "checkout-step"
              }
              key={step}
            >
              {checkoutLabels[step]}
            </span>
          ))}
        </div>

        <div className="cart-content">
          {hasItems ? (
            items.map((item) => (
              <article className="cart-line" key={item.product.id}>
                <ProductIcon product={item.product} size="small" />
                <div className="cart-line-info">
                  <h3>{item.product.title}</h3>
                  <p>{item.product.delivery.label}</p>
                  <strong>{item.product.price * item.quantity} ₽</strong>
                </div>
                <div className="quantity-control" aria-label={`Количество ${item.product.title}`}>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    disabled={isBusy}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    disabled={isBusy}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-line"
                  type="button"
                  onClick={() => onRemove(item.product.id)}
                  disabled={isBusy}
                >
                  Удалить
                </button>
              </article>
            ))
          ) : (
            <div className="empty-cart">
              <h3>{lastOrder ? "Заказ готов" : "Корзина пуста"}</h3>
              <p>
                {lastOrder
                  ? `Заказ ${lastOrder.id} для ${lastOrder.playerName} успешно обработан.`
                  : "Добавьте товары из магазина, чтобы перейти к оформлению."}
              </p>
            </div>
          )}
        </div>

        {lastOrder && (
          <div className="order-result">
            <h3>Демо-выдача</h3>
            <p>Команды, которые позже будет отправлять backend через RCON или plugin API:</p>
            <ul>
              {lastOrder.deliveryCommands.slice(0, 5).map((command, index) => (
                <li key={`${command}-${index}`}>{command}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="cart-footer">
          <div className="cart-total">
            <span>Итого</span>
            <strong>{total} ₽</strong>
          </div>
          <div className="cart-actions">
            <button className="ghost-button" type="button" onClick={onClear} disabled={!hasItems || isBusy}>
              Очистить
            </button>
            <button className="checkout-button" type="button" onClick={onCheckout} disabled={!hasItems || isBusy}>
              {isBusy ? checkoutLabels[checkoutState] : "Оплатить демо"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
