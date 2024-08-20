import { OrderBookDto } from "@/core/api/baseApi";
import debounce from "@/core/utils/debounce";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

interface Props {
  data: OrderBookDto;
}

const BuyInput: React.FC<Props> = ({ data }) => {
  const [amount, setAmount] = useState<number>();
  const [price, setPrice] = useState<number>();

  const handleAmountInput = useCallback(
    debounce((amount: number) => getPrice(amount), 300),
    []
  );

  const getPrice = (amount: number | undefined) => {
    if (amount === undefined || !data.asks?.length) return undefined;

    let priceResult = 0;
    let amountSum = 0;
    for (let index = 0; index < data.asks.length; index++) {
      const currentAsk = data.asks[index];
      amountSum += currentAsk.amount;

      // calculate redundant part of price and remove it
      if (amountSum > amount) {
        const dif = amountSum - amount;
        const difPercentage = (dif * 100) / currentAsk.amount;
        const difPrice = (difPercentage * currentAsk.price) / 100;

        priceResult += currentAsk.price - difPrice;
        break;
      }

      priceResult += data.asks[index].price;
    }

    setPrice(priceResult);
  };

  useEffect(() => {
    handleAmountInput(amount);
  }, [amount]);

  useEffect(() => {
    getPrice(amount);
  }, [data]);

  return (
    <div>
      <InputGroup>
        <InputLeftAddon>Amount</InputLeftAddon>
        <Input
          type="number"
          placeholder="BTC"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </InputGroup>
      <Stat className="p-4">
        <StatLabel>Price</StatLabel>
        <StatNumber>{price || 0}</StatNumber>
      </Stat>
    </div>
  );
};

export default BuyInput;
