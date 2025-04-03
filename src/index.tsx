import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./style/style.scss";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
