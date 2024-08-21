import environment from "@/core/utils/environment";
import { PropsWithChildren, useEffect } from "react";
import { createSignalRContext } from "react-signalr";

export const SignalRContext = createSignalRContext();

const HubProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  console.log(environment.apiUrl! + environment.signalrEndpoint);
  return (
    <SignalRContext.Provider
      url={environment.apiUrl! + environment.signalrEndpoint}
      automaticReconnect
      connectEnabled
      dependencies={[]}
      withCredentials={false}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export default HubProvider;
