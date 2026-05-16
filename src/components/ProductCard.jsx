import React from "react";
import ProductIcon from "./ProductIcon.jsx";

export default function ProductCard({ product, onBuy }) {
  return (
    <article className={`product-card tone-${product.tone}`}>
      <div className="product-media" aria-hidden="true">
        <ProductIcon product={product} />
      </div>
      <div className="product-body">
        <span className="product-badge">{product.badge}</span>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <small>{product.delivery.label}</small>
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
