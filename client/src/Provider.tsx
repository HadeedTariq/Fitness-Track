import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as Redux } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";

const client = new QueryClient();

type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <Redux store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Redux>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default Provider;
