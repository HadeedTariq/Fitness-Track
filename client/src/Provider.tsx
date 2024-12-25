import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as Redux } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

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
          <Toaster />
        </Redux>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default Provider;
