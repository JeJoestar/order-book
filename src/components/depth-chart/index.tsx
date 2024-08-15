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

const DepthChart: React.FC<Props> = ({ data }) => {
  const chartData = [
    ...(data.bids?.map((b) => ({
      ...b,
      type: "BID",
    })) || []),
    ...(data.asks?.map((a) => ({
      ...a,
      type: "ASK",
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
              cursor="pointer"
              fill={entry.type === "BID" ? "#82ca9d" : "#de0a26"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DepthChart;
