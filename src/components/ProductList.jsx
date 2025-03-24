import React from "react";
import Product from "./Product";
const ProductList = ({ deserts, isPending }) => {
  return (
    <div>
      <h1 className="desserts-title">Desserts</h1>
      {isPending && <h2>Loading...</h2>}
      <div className="desserts-container ">
        {deserts &&
          deserts.map((d) => {
            return <Product key={d.id} d={d} />;
          })}
      </div>
    </div>
  );
};

export default ProductList;
