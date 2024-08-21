"use client";

import environment from "@/core/utils/environment";
import { HttpTransportType } from "@microsoft/signalr";
import { PropsWithChildren } from "react";
import { createSignalRContext } from "react-signalr";

export const SignalRContext = createSignalRContext();

const HubProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <SignalRContext.Provider
      dependencies={[]}
      url={environment.apiUrl! + environment.signalrEndpoint}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export default HubProvider;
