"use client";

import BuyInput from "@/components/buy-input";
import DepthChart from "@/components/depth-chart";
import OrderBookTable from "@/components/order-book-table";
import SelectInput from "@/components/snapshot-select";
import { useGetOrdersQuery } from "@/core/api/baseApi";
import useAppSelector from "@/hooks/use-app-selector";
import { Button, CircularProgress } from "@chakra-ui/react";
import { useState } from "react";

const Home: React.FC = () => {
  const [dateKey, setDateKey] = useState<string>();
  const { data } = useAppSelector((state) => state.orderBook);
  const { currentData: dataByKey, isFetching } = useGetOrdersQuery(
    {
      key: dateKey,
    },
    {
      skip: !dateKey,
    }
  );

  const dataToRender = dateKey ? (!isFetching ? dataByKey : data) : data;

  if (!dataToRender) {
    return (
      <div className="min-h-[100vh] relative">
        <CircularProgress isIndeterminate className="!absolute-center" />
      </div>
    );
  }

  return (
    <div>
      <div>
        <BuyInput data={dataToRender} />
        <SelectInput onChange={setDateKey} />
      </div>
      <DepthChart data={dataToRender} />
      {dataByKey && (
        <Button onClick={() => setDateKey(undefined)}>
          Back to actual data
        </Button>
      )}
      <OrderBookTable data={dataToRender} />
    </div>
  );
};

export default Home;
