"use client";

import { SignalRContext } from "@/boot/signalr";
import BuyInput from "@/components/buy-input";
import DepthChart from "@/components/depth-chart";
import OrderBookTable from "@/components/order-book-table";
import SelectInput from "@/components/select-input";
import {
  OrderBookDto,
  useGetOrdersDateKeysQuery,
  useGetOrdersQuery,
} from "@/core/api/baseApi";
import { dayjsExt } from "@/core/utils/dayjs";
import { Button, CircularProgress } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [dateKey, setDateKey] = useState<string>();
  const [data, setData] = useState<OrderBookDto>();
  const [keysData, setKeysData] = useState<string[]>([]);
  const { data: orderBooksKeys } = useGetOrdersDateKeysQuery();
  const { currentData: dataByKey } = useGetOrdersQuery(
    {
      key: dateKey,
    },
    {
      skip: !dateKey,
    }
  );

  useEffect(() => {
    if (!orderBooksKeys) return;

    setKeysData(orderBooksKeys);
  }, [orderBooksKeys]);

  SignalRContext.useSignalREffect(
    "SendTradeUpdate",
    (orderBook: OrderBookDto) => {
      setData(orderBook);
      setKeysData([...keysData, orderBook.retrievedAt]);
    },
    []
  );

  const dataToRender = dateKey ? dataByKey : data;

  if (!dataToRender || !orderBooksKeys) {
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
        <SelectInput
          value={dateKey}
          options={orderBooksKeys.map((key) => ({
            label: dayjsExt(key).format("YYYY.MM.DD HH:mm"),
            value: key,
          }))}
          onChange={setDateKey}
          placeholder="Select snapshot"
        />
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
