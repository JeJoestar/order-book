"use client";

import BuyInput from "@/components/buy-input";
import DepthChart from "@/components/depth-chart";
import { useGetOrdersQuery } from "@/core/api/baseApi";
import { Box, CircularProgress } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const Home: React.FC = () => {
  const { currentData } = useGetOrdersQuery(undefined, {
    pollingInterval: 500,
  });

  if (!currentData) {
    return <CircularProgress />;
  }

  return (
    <div>
      <div>
        <BuyInput rate={currentData.averagePrice as number} />
      </div>
      <DepthChart data={currentData} />
      <div className="flex [&>*]:flex-1">
        <TableContainer overflowY={"auto"} className="max-h-[calc(50vh)]">
          <Table variant="simple" maxHeight="50%">
            <Thead>
              <Tr>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Amount</Th>
                <Th isNumeric>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentData.bids?.map((bid, index) => (
                <Tr key={`bid-${index}`}>
                  <Td isNumeric>{bid.price}</Td>
                  <Td isNumeric>{bid.amount}</Td>
                  <Td isNumeric>
                    {(bid.price as number) * (bid.amount as number)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <TableContainer overflowY={"auto"} className="max-h-[calc(50vh)]">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Amount</Th>
                <Th isNumeric>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentData.asks?.map((ask, index) => (
                <Tr key={`ask-${index}`}>
                  <Td isNumeric>{ask.price}</Td>
                  <Td isNumeric>{ask.amount}</Td>
                  <Td isNumeric>
                    {(ask.price as number) * (ask.amount as number)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
