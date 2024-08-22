// import { Select } from "@chakra-ui/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useState } from "react";
import useSnapshotKeyPagination from "@/hooks/use-snapshot-keys-pagination";
import { dayjsExt } from "@/core/utils/dayjs";

interface Props {
  onChange(value: string): void;
}

const SelectInput: React.FC<Props> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: orderBookKeys,
    hasNextPage: hasMore,
    isLoading,
    loadMore: onLoadMore,
  } = useSnapshotKeyPagination();

  const [, scrollerRef] = useInfiniteScroll({
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
    hasMore,
  });

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        aria-label="select-snapshot"
        className="max-w-xs"
        isLoading={isLoading}
        items={orderBookKeys.map((str) => ({ value: str }))}
        placeholder="Pick a time of a snapshot"
        scrollRef={scrollerRef}
        selectionMode="single"
        onOpenChange={setIsOpen}
        onChange={handleSelectionChange}
      >
        {(item) => (
          <SelectItem key={item.value} className="capitalize">
            {dayjsExt(item.value).format("YYYY.MM.DD HH:mm:ss")}
          </SelectItem>
        )}
      </Select>
    </div>
  );
};

export default SelectInput;
