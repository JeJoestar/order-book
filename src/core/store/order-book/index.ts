import { OrderBookDto } from "@/core/api/baseApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderBookState {
  data?: OrderBookDto;
}

const initialState: OrderBookState = {
  data: undefined,
};

const orderBookSlice = createSlice({
  initialState,
  name: "orderBook",
  reducers: {
    setOrderBook: (state, action: PayloadAction<OrderBookDto>) => {
      state.data = action.payload;
    },
  },
});

export const { setOrderBook } = orderBookSlice.actions;

export default orderBookSlice.reducer;
