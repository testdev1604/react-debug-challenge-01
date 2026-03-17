import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, totalPrice, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <section className="cart-section">
        <h2 className="section-title">Your Cart</h2>
        <p className="cart-empty" data-testid="cart-empty">
          Your cart is empty.
        </p>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <h2 className="section-title">Your Cart</h2>
      <div className="cart-items">
        {items.map((item) => (
          <div
            className="cart-item"
            key={item.id}
            data-testid={`cart-item-${item.id}`}
          >
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-actions">
              <button
                className="qty-btn"
                data-testid={`decrease-qty-${item.id}`}
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                &minus;
              </button>
              <span className="qty-value" data-testid={`qty-${item.id}`}>
                {item.quantity}
              </span>
              <button
                className="qty-btn"
                data-testid={`increase-qty-${item.id}`}
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="remove-btn"
                data-testid={`remove-item-${item.id}`}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total" data-testid="cart-total">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </section>
  );
}
