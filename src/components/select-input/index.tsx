import { Select } from "@chakra-ui/react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  placeholder: string;
  options: Option[];
  value?: string;
  onChange(value: string): void;
}

const SelectInput: React.FC<Props> = ({
  options,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <Select
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    >
      <option value="" selected={!value} disabled hidden>
        {placeholder}
      </option>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </Select>
  );
};

export default SelectInput;
