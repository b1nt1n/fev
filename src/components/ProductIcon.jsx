import React from "react";

export default function ProductIcon({ product, size = "large" }) {
  return (
    <div className={`product-icon product-icon-${size} icon-${product.iconType}`}>
      <span className="icon-shine" aria-hidden="true" />
      <span className="icon-glyph" aria-hidden="true">
        {product.icon}
      </span>
      <span className="icon-cut cut-one" aria-hidden="true" />
      <span className="icon-cut cut-two" aria-hidden="true" />
    </div>
  );
}
