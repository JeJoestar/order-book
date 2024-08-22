// import { Select } from "@chakra-ui/react";
import { Select, SelectItem } from "@nextui-org/react";
import CustomMenuList from "../custom-menu-list";

interface Option {
  value: string;
  label: string;
}

interface Props {
  placeholder: string;
  options: Option[];
  value?: Option;
  onClick(): void;
  onChange(value: string): void;
}

const SelectInput: React.FC<Props> = ({
  options,
  value,
  placeholder,
  onClick,
  onChange,
}) => {
  // return (
  //   <Select
  //     onClick={onClick}
  //     onChange={(e) => onChange(e.target.value)}
  //     placeholder={placeholder}
  //   >
  //     <option disabled hidden>
  //       {placeholder}
  //     </option>
  //     <CustomMenuList
  //       maxHeight={300}
  //       options={options}
  //       value={value}
  //       width={300}
  //     />
  //   </Select>
  // );
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select label="Select an animal" className="max-w-xs">
        {options.map((option) => (
          <SelectItem key={option.value}>{option.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectInput;
