"use client";

import SignalRProvider from "@/boot/signalr";
import { store } from "@/core/store";
import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";

interface Props extends PropsWithChildren {}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <NextUIProvider>
      <ChakraProvider>
        <Provider store={store}>
          <SignalRProvider>{children}</SignalRProvider>
        </Provider>
      </ChakraProvider>
    </NextUIProvider>
  );
};

export default Providers;
