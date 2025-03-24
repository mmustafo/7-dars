import React from "react";
import { useGLobalContext } from "../hooks/useGlobalContext";

const Product = ({ d }) => {
  const { dispatch, cart } = useGLobalContext();
  const { id, name, category, price, image } = d;
  const alreadyAdded = cart.find((item) => item.id === id);

  return (
    <div className="dessert-card">
      <picture>
        <source media="(min-width: 998px)" srcSet={image.desktop} />
        <source media="(min-width: 800px)" srcSet={image.tablet} />
        <source media="(min-width: 400px)" srcSet={image.mobile} />
        <img className="dessert-card-image" src={image.thumbnail} alt={name} />
      </picture>

      <div className="button-wrapper">
        {!alreadyAdded || alreadyAdded.amount === 0 ? (
          <button
          className="add-to-card-btn"
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: { ...d, amount: 1 },
              })
            }
          >
            <span className="add-to-cart-btn-wrapper">
              <div className="btn__df">
              <img src="../images/icon-add-to-cart.svg" alt="" />
              <span>Add to Cart</span>
              </div>
            </span>
          </button>
        ) : (
          <div className="quantity-controls">
            <button className="add-to-card-btn-wrapper amout-btn"
              onClick={() => {
                if (alreadyAdded.amount === 1) {
                  dispatch({ type: "DELETE", payload: id });
                } else {
                  dispatch({ type: "DECREMENT", payload: id });
                }
              }}
            >
              -
            </button>
            <h3 className="btn__amout__text">{alreadyAdded.amount}</h3>
            <button className="amout-btn"
              onClick={() => dispatch({ type: "INCREMENT", payload: id })}
            >
              +
            </button>
          </div>
        )}
      </div>

      <div className="desserts-card-body">
        <p className="dessert-card-category">{category}</p>
        <h3 className="dessert-card-name">{name}</h3>
        <p className="dessert-card-price">${price}</p>
      </div>
    </div>
  );
};

export default Product;
