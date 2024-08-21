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
      query: () => ({ url: `/Orders/date-keys` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as baseApi };
export type GetOrdersApiResponse = /** status 200 Success */ OrderBookDto;
export type GetOrdersApiArg = {
  key?: string;
};
export type GetOrdersDateKeysApiResponse = /** status 200 Success */ string[];
export type GetOrdersDateKeysApiArg = void;
export type AskBidDto = {
  amount: number;
  price: number;
};
export type OrderBookDto = {
  retrievedAt: string;
  bids: AskBidDto[] | null;
  asks: AskBidDto[] | null;
};
export const { useGetOrdersQuery, useGetOrdersDateKeysQuery } = injectedRtkApi;
