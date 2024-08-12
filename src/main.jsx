import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CssVarsProvider } from '@mui/joy/styles';
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <CssVarsProvider>
        <App />
      </CssVarsProvider>
    </StrictMode>

  </BrowserRouter>
);
