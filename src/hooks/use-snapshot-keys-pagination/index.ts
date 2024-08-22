import { useGetOrdersDateKeysQuery } from "@/core/api/baseApi";
import { useEffect, useState } from "react";

const useSnapshotKeyPagination = () => {
  const [data, setData] = useState<string[]>([]);
  const [page, setPage] = useState<string>();

  const {
    currentData: orderBooksKeys,
    isLoading,
    isFetching,
  } = useGetOrdersDateKeysQuery({
    pageNumber: page,
    pageSize: 30,
  });

  useEffect(() => {
    if (!orderBooksKeys) return;

    setData((prev) => [...prev, ...(orderBooksKeys.items || [])]);
  }, [orderBooksKeys]);

  const loadMore = () => {
    if (page !== orderBooksKeys?.pageNumber)
      setPage(orderBooksKeys?.pageNumber);
  };

  return {
    data,
    isLoading: isLoading || isFetching,
    loadMore,
    hasNextPage: !!orderBooksKeys?.hasNextPage,
  };
};

export default useSnapshotKeyPagination;
