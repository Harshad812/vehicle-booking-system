import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Header } from "./components";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col h-screen">
          <Header />
          <Router />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
