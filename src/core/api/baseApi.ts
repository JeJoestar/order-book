import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<GetOrdersApiResponse, GetOrdersApiArg>({
      query: () => ({ url: `/Orders` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as baseApi };
export type GetOrdersApiResponse = /** status 200 Success */ OrderBookDto;
export type GetOrdersApiArg = void;
export type AskBidDto = {
  amount?: number;
  price?: number;
};
export type OrderBookDto = {
  bids?: AskBidDto[] | null;
  asks?: AskBidDto[] | null;
  averagePrice?: number;
};
export const { useGetOrdersQuery } = injectedRtkApi;
