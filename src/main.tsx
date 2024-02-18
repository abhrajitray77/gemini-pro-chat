import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChatProvider } from "./utils/ChatProvider.tsx";
import { ModelProvider } from "./utils/ModelProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModelProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </ModelProvider>
  </React.StrictMode>
);
