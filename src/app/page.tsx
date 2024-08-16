"use client";

import BuyInput from "@/components/buy-input";
import DepthChart from "@/components/depth-chart";
import OrderBookTable from "@/components/order-book-table";
import { useGetOrdersQuery } from "@/core/api/baseApi";
import { CircularProgress } from "@chakra-ui/react";

const Home: React.FC = () => {
  const { currentData } = useGetOrdersQuery(undefined, {
    pollingInterval: 500,
  });

  if (!currentData) {
    return (
      <div className="min-h-[100vh] relative">
        <CircularProgress isIndeterminate className="!absolute-center" />
      </div>
    );
  }

  return (
    <div>
      <BuyInput rate={currentData.averagePrice as number} />
      <DepthChart data={currentData} />
      <OrderBookTable data={currentData} />
    </div>
  );
};

export default Home;
