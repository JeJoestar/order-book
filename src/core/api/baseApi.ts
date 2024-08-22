import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<GetOrdersApiResponse, GetOrdersApiArg>({
      query: (queryArg) => ({ url: `/Orders`, params: { key: queryArg.key } }),
    }),
    getOrdersDateKeys: build.query<
      GetOrdersDateKeysApiResponse,
      GetOrdersDateKeysApiArg
    >({
      query: (queryArg) => ({
        url: `/Orders/date-keys`,
        params: {
          pageSize: queryArg.pageSize,
          pageNumber: queryArg.pageNumber,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as baseApi };
export type GetOrdersApiResponse = /** status 200 Success */ OrderBookDto;
export type GetOrdersApiArg = {
  key?: string;
};
export type GetOrdersDateKeysApiResponse =
  /** status 200 Success */ DateTimeOffsetDateTimeOffsetPagedListRead;
export type GetOrdersDateKeysApiArg = {
  pageSize: number;
  pageNumber?: string;
};
export type AskBidDto = {
  amount: number;
  price: number;
};
export type OrderBookDto = {
  retrievedAt: string;
  bids: AskBidDto[] | null;
  asks: AskBidDto[] | null;
};
export type DateTimeOffsetDateTimeOffsetPagedList = {
  items: string[] | null;
  pageNumber: string;
  pageSize: number;
};
export type DateTimeOffsetDateTimeOffsetPagedListRead = {
  items: string[] | null;
  pageNumber: string;
  pageSize: number;
  hasNextPage: boolean;
};
export const { useGetOrdersQuery, useGetOrdersDateKeysQuery } = injectedRtkApi;
