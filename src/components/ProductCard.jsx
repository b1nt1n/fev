import React from "react";

export default function ProductCard({ product, onBuy }) {
  return (
    <article className={`product-card tone-${product.tone}`}>
      <div className="product-media" aria-hidden="true">
        <div className="item-cube">
          <span>{product.icon}</span>
        </div>
      </div>
      <div className="product-body">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-footer">
        <strong>{product.price} ₽</strong>
        <button type="button" onClick={() => onBuy(product)}>
          Купить
        </button>
      </div>
    </article>
  );
}
