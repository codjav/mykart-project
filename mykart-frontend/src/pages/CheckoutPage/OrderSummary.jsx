import { CartItem } from "./CartItem";

export function OrderSummary({ deliveryOptions, cart, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {

          return (
            <CartItem key={cartItem.productId} cartItem={cartItem} loadCart={loadCart} deliveryOptions={deliveryOptions} />
          );
        })}
    </div>
  );
}
