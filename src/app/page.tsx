"use client";

import { SignalRContext } from "@/boot/signalR";
import BuyInput from "@/components/buy-input";
import DepthChart from "@/components/depth-chart";
import OrderBookTable from "@/components/order-book-table";
import { OrderBookDto, useGetOrdersQuery } from "@/core/api/baseApi";
import { CircularProgress } from "@chakra-ui/react";
import { useState } from "react";

const Home: React.FC = () => {
  const [data, setData] = useState<OrderBookDto>();
  SignalRContext.useSignalREffect(
    "SendTradeUpdate",
    (orderBook: OrderBookDto) => {
      setData(orderBook);
    },
    []
  );

  if (!data) {
    return (
      <div className="min-h-[100vh] relative">
        <CircularProgress isIndeterminate className="!absolute-center" />
      </div>
    );
  }

  return (
    <div>
      <BuyInput data={data} />
      <DepthChart data={data} />
      <OrderBookTable data={data} />
    </div>
  );
};

export default Home;
