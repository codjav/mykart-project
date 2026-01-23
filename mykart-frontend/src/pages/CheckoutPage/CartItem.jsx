import dayjs from "dayjs";
import axios from "axios";
import { useState } from "react";
import { DeliveryOptions } from "./DeliveryOptions";
import { formatMoney } from "../../utils/money";

export function CartItem({ cartItem, loadCart, deliveryOptions }) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const selectedDeliveryOption = deliveryOptions.find(
    (deliveryOption) => {
        return deliveryOption.id == cartItem.deliveryOptionId;
    },
  );

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantity = function(event) {
    const updatedQuantity = event.target.value;
    setQuantity(updatedQuantity);
  }

  const updateCartItem = async () => {
    setShowUpdate(!showUpdate);

    await axios.put(`/api/cart-items/${cartItem.productId}`,{
      quantity: Number(quantity)
    });
    await loadCart();
  };

  const keyUpdateCartItem = async (event) => {
    if (event.key === 'Enter') {
      setShowUpdate(!showUpdate);

      await axios.put(`/api/cart-items/${cartItem.productId}`,{
        quantity: Number(quantity)
      });

      await loadCart();
    } else if (event.key === 'Escape') {
        setShowUpdate(false);

        setQuantity(cartItem.quantity);
    }
  };


  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
          "dddd, MMMM D",
        )}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              <span className="quantity-label">
                {showUpdate && <input  className="product-quantity-update" value={quantity} onChange={updateQuantity} onKeyDown={keyUpdateCartItem} type="text" />}
                {cartItem.quantity}
              </span>
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={updateCartItem}
            >
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteCartItem}
            >
              Delete
            </span>
          </div>
        </div>

        <DeliveryOptions
          cartItem={cartItem}
          deliveryOptions={deliveryOptions}
          loadCart={loadCart}
        />
      </div>
    </div>
  );
}
