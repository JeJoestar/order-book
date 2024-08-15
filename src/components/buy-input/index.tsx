import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface Props {
  rate: number;
}

const BuyInput: React.FC<Props> = ({ rate }) => {
  const [focusedInput, setFocusedInput] = useState<"price" | "amount">();
  const [amount, setAmount] = useState<number>();
  const [price, setPrice] = useState<number>();

  useEffect(() => {
    if (amount === undefined || focusedInput !== "amount") return;

    setPrice(rate * amount);
  }, [amount, focusedInput, rate]);

  useEffect(() => {
    if (price === undefined || focusedInput !== "price") return;

    setAmount(price / rate);
  }, [price, focusedInput, rate]);

  return (
    <div>
      <InputGroup>
        <InputLeftAddon>Amount</InputLeftAddon>
        <Input
          onFocus={() => setFocusedInput("amount")}
          type="number"
          placeholder="BTC"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>Price</InputLeftAddon>
        <Input
          onFocus={() => setFocusedInput("price")}
          type="number"
          placeholder="EUR"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
      </InputGroup>
    </div>
  );
};

export default BuyInput;
