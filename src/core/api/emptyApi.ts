import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import queryString from "query-string";

import { Action } from "@reduxjs/toolkit/react";
import { RootState } from "../store";
import environment from "../utils/environment";

// initialize an empty api service that we'll inject endpoints into later as needed
// eslint-disable-next-line

const isHydrateAction = (
  action: Action
): action is Action<typeof HYDRATE> & {
  key: string;
  payload: RootState;
  err: unknown;
} => {
  return action.type === HYDRATE;
};

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiUrl,
    paramsSerializer: (params) =>
      queryString.stringify(params, { sort: false }),
  }),
  extractRehydrationInfo(action, { reducerPath }): any {
    return isHydrateAction(action) && action.key === reducerPath
      ? action.payload
      : undefined;
  },
  endpoints: () => ({}),
});
