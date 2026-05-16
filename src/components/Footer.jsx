import React from "react";

export default function Footer({ links }) {
  return (
    <footer className="site-footer" id="help">
      <div>
        <h2>Соц. сети</h2>
        <p>Следите за новостями FeverBox и обновлениями магазина.</p>
      </div>
      <div className="social-links">
        {links.map((link) => (
          <a key={link.id} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
