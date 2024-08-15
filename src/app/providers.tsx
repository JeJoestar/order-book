"use client";

import { store } from "@/core/store";
import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

interface Props extends PropsWithChildren {}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ChakraProvider>
      <Provider store={store}>{children}</Provider>
    </ChakraProvider>
  );
};

export default Providers;
