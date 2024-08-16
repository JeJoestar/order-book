import { AskBidDto, OrderBookDto } from "@/core/api/baseApi";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Props {
  data: OrderBookDto;
}

export enum OrderType {
  Ask = "ASK",
  Bid = "BID",
}

const BID_GREEN_COLOR = "#82ca9d";
const ASK_RED_COLOR = "#de0a26";

const DepthChart: React.FC<Props> = ({ data }) => {
  const chartData = [
    ...(data.bids?.map((b) => ({
      ...b,
      type: OrderType.Bid,
    })) || []),
    ...(data.asks?.map((a) => ({
      ...a,
      type: OrderType.Ask,
    })) || []),
  ];

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="price" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount">
          {chartData.map((entry, index) => (
            <Cell
              fill={
                entry.type === OrderType.Bid ? BID_GREEN_COLOR : ASK_RED_COLOR
              }
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DepthChart;
