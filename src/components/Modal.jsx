import React from "react";

const Modal = ({ isOpen, onClose, cart, totalPrice }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Order Confirmed</h2>
          <p>We hope you enjoy your food!</p>
        </div>

        <div className="order-items">
          {cart.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.image.thumbnail} alt={item.name} className="item-image" />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>
                  {item.amount}x @ ${item.price}
                </p>
              </div>
              <h3 className="item-total">${(item.amount * item.price).toFixed(2)}</h3>
            </div>
          ))}
        </div>

        <div className="order-total">
          <h3>Order Total</h3>
          <h2>${totalPrice.toFixed(2)}</h2>
        </div>

        <button className="new-order-btn" onClick={onClose}>
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default Modal;
