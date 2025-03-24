import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { GlobalContentProvider } from "./context/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <GlobalContentProvider>
    <App />
  </GlobalContentProvider>
);
