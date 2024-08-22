"use client";

import { SignalRContext } from "@/boot/signalr";
import BuyInput from "@/components/buy-input";
import CustomMenuList from "@/components/custom-menu-list";
import DepthChart from "@/components/depth-chart";
import OrderBookTable from "@/components/order-book-table";
import SelectInput from "@/components/select-input";
import {
  OrderBookDto,
  useGetOrdersDateKeysQuery,
  useGetOrdersQuery,
} from "@/core/api/baseApi";
import { dayjsExt } from "@/core/utils/dayjs";
import useAppSelector from "@/hooks/use-app-selector";
import { Button, CircularProgress } from "@chakra-ui/react";
import { useState } from "react";

const Home: React.FC = () => {
  const [dateKey, setDateKey] = useState<string>();
  const { data } = useAppSelector((state) => state.orderBook);
  const { currentData: orderBooksKeys, refetch: reloadKeys } =
    useGetOrdersDateKeysQuery();
  const { currentData: dataByKey } = useGetOrdersQuery(
    {
      key: dateKey,
    },
    {
      skip: !dateKey,
    }
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
          value={
            dateKey
              ? {
                  label: dayjsExt(dateKey).format("YYYY.MM.DD HH:mm"),
                  value: dateKey,
                }
              : undefined
          }
          options={orderBooksKeys.map((key) => ({
            label: dayjsExt(key).format("YYYY.MM.DD HH:mm"),
            value: key,
          }))}
          onClick={() => reloadKeys()}
          onChange={setDateKey}
          placeholder="Select snapshot"
        />
        {/* <CustomMenuList
          maxHeight={300}
          options={orderBooksKeys.map((key) => ({
            label: dayjsExt(key).format("YYYY.MM.DD HH:mm"),
            value: key,
          }))}
          value={
            dateKey
              ? {
                  label: dayjsExt(dateKey).format("YYYY.MM.DD HH:mm"),
                  value: dateKey,
                }
              : undefined
          }
          width={300}
        /> */}
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
