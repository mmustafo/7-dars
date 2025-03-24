import React from "react";
import ProductList from "./components/ProductList";
import YourCard from "./components/YourCard";
import { useFetch } from "./hooks/useFetch";
const App = () => {
  const {
    data: deserts,
    isPending,
    error,
  } = useFetch("http://localhost:3000/desserts");

  return (
    <div className="container grid-container">
      <ProductList deserts={deserts} isPending={isPending} />
      <YourCard />
    </div>
  );
};

export default App;
