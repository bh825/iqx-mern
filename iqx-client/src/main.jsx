import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SplashScreen from "./pages/SplashScreen.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<SplashScreen />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
