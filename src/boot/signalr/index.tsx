import environment from "@/core/utils/environment";
import { PropsWithChildren } from "react";
import { createSignalRContext } from "react-signalr";

export const SignalRContext = createSignalRContext();

const HubProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <SignalRContext.Provider
      url={environment.apiUrl! + environment.signalrEndpoint}
      automaticReconnect
      connectEnabled
      logMessageContent={false}
      dependencies={[]}
      logger={undefined}
      withCredentials={false}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export default HubProvider;
