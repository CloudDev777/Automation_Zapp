import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster position="bottom-right" />
  </>
);
