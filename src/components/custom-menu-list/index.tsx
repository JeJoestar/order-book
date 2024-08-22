import { Button } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { FixedSizeList as List } from "react-window";

interface Option {
  value: string;
  label: string;
}

interface Props {
  value?: Option;
  options: Option[];
  maxHeight: number;
  width: number | string;
}

const CustomMenuList: React.FC<Props> = ({
  maxHeight,
  options,
  width,
  value,
}) => {
  const itemHeight = 35;
  const initialOffset = !!value ? options.indexOf(value) * itemHeight : 0;

  return (
    <List
      width={width}
      height={maxHeight}
      itemCount={options.length}
      itemSize={itemHeight}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => (
        <Button className="bg-white" style={style}>
          {options[index].label}
        </Button>
      )}
    </List>
  );
};

export default CustomMenuList;
