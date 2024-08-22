import {
  Action,
  combineReducers,
  configureStore,
  isRejectedWithValue,
  Middleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { toast } from "sonner";
import { baseApi } from "../api/baseApi";
import orderBookReducer from "./order-book";

const combinedReducer = combineReducers({
  orderBook: orderBookReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const anyAction = action as any;
    if (anyAction.payload.status !== 401 && anyAction.payload.status !== 403) {
      toast.error(anyAction.payload.data?.message || anyAction.payload.error);
    }
  }

  return next(action);
};

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(baseApi.middleware)
        .concat(rtkQueryErrorLogger),
  });

export const store = makeStore();

type Store = ReturnType<typeof makeStore>;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, {
  debug: false,
});
