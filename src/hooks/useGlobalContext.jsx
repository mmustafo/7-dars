import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const useGLobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext ni GLobalProvider ichi da ishlatamiz");
  }
  return context;
};
