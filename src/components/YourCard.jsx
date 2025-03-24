import React, { useEffect, useState } from "react";
import { useGLobalContext } from "../hooks/useGlobalContext";
import Modal from "./Modal";

const YourCard = () => {
  const { dispatch, cart, totalPrice } = useGLobalContext();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTAL" });
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, dispatch]);

  return (
    <div>
      <div className="your__content">
        <h2 className="your__card__amout">Your Cart ({cart.length})</h2>
        {!cart.length && (
          <div className="your__not__card">
            <img
              className="your__not__card__img"
              src="../images/illustration-empty-cart.svg"
              alt="Empty Cart"
            />
            <h3 className="your__not__card__text">
              Your added items will appear here
            </h3>
          </div>
        )}
        {cart.length > 0 && (
          <ul className="your__card__ul">
            {cart.map((el) => (
              <li className="your__card__li" key={el.id}>
                <div>
                  <h3>{el.name}</h3>
                  <div className="your__card__img__title__df">
                    <div className="your__card__title__df">
                      <h3 className="your__card__amout">{el.amount}X</h3>
                      <h3 className="your__card__price">@ ${el.price}</h3>
                      <h3 className="your__card__all__price">
                        ${el.amount * el.price}
                      </h3>
                    </div>
                    <img
                      onClick={() => dispatch({ type: "DELETE", payload: el.id })}
                      src="../images/icon-remove-item.svg"
                      alt="Remove Item"
                      className="remove-item-btn"
                    />
                  </div>
                </div>
              </li>
            ))}
            <div className="your__footer">
              <h4 className="your__card__delivey">
                <img src="../images/icon-carbon-neutral.svg" alt="" /> This is a <strong>carbon-neutral</strong> delivery
              </h4>
              <h2 className="your__total__price">Total Price: ${totalPrice}</h2>
              <button onClick={() => setModalOpen(true)} className="your___card__button">
                Confirm Order
              </button>
            </div>
          </ul>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} cart={cart} totalPrice={totalPrice} />
    </div>
  );
};

export default YourCard;
