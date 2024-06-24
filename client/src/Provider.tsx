import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as Redux } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider";

const client = new QueryClient();

type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={client}>
      <Redux store={store}>
        <BrowserRouter>
          <ThemeProvider>{children}</ThemeProvider>
        </BrowserRouter>
      </Redux>
    </QueryClientProvider>
  );
};

export default Provider;
