import { AskBidDto, OrderBookDto } from "@/core/api/baseApi";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { OrderType } from "../depth-chart";

interface Props {
  data: OrderBookDto;
}

const OrderBookTable: React.FC<Props> = ({ data }) => {
  const renderRows = (entries: AskBidDto[], type: OrderType) =>
    entries.map((entry, index) => (
      <Tr key={`${type}-${index}`}>
        <Td isNumeric>{entry.price}</Td>
        <Td isNumeric>{entry.amount}</Td>
        <Td isNumeric>{(entry.price as number) * (entry.amount as number)}</Td>
      </Tr>
    ));

  const tableHead = (
    <Thead>
      <Tr>
        <Th isNumeric>Price</Th>
        <Th isNumeric>Amount</Th>
        <Th isNumeric>Value</Th>
      </Tr>
    </Thead>
  );

  const tableContainerStyles = "max-h-[calc(50vh)]";

  return (
    <div className="flex [&>*]:flex-1">
      <TableContainer overflowY="auto" className={tableContainerStyles}>
        <Table variant="simple">
          {tableHead}
          <Tbody>{renderRows(data.bids || [], OrderType.Bid)}</Tbody>
        </Table>
      </TableContainer>

      <TableContainer overflowY="auto" className={tableContainerStyles}>
        <Table variant="simple">
          {tableHead}
          <Tbody>{renderRows(data.asks || [], OrderType.Ask)}</Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderBookTable;
