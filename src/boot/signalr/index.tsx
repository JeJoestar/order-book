import { useEffect, PropsWithChildren, useState, createContext } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { OrderBookDto } from "@/core/api/baseApi";
import useAppDispatch from "@/hooks/use-app-dispatch";
import { setOrderBook } from "@/core/store/order-book";
import environment from "@/core/utils/environment";

interface HubContextValues {
  hubConnection?: HubConnection;
}

const initialContext: HubContextValues = {};

export const HubContext = createContext<HubContextValues>(initialContext);

const HubProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [socketState, setSocketState] = useState<HubConnection>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(environment.apiUrl! + environment.signalrEndpoint)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.None)
      .build();

    connection
      .start()
      .then(() => {
        connection.on("SendTradeUpdate", (orderBook: OrderBookDto) => {
          dispatch(setOrderBook(orderBook));
        });

        setSocketState(connection);
      })
      .catch(() => {
        setSocketState(undefined);
      });
    return () => {
      if (connection) {
        connection.off("SendTradeUpdate");
      }
    };
  }, []);

  const contextValue: HubContextValues = {
    hubConnection: socketState,
  };

  return (
    <HubContext.Provider value={contextValue}>{children}</HubContext.Provider>
  );
};

export default HubProvider;
