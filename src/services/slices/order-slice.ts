import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { orderBurgerApi } from '@utils/burger-api';

import type { TOrder } from '@utils-types';
export const createOrder = createAsyncThunk(
  'createOrder',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

type OrderState = {
  order: TOrder | null;
  isOrderRequest: boolean;
  error: Error | null;
  orderSuccess: boolean;
};

const initialState: OrderState = {
  order: null,
  isOrderRequest: false,
  error: null,
  orderSuccess: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isOrderRequest = true;
        state.error = null;
        state.orderSuccess = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isOrderRequest = false;
        state.order = action.payload.order.ingredients
          ? action.payload.order
          : { ...action.payload.order, ingredients: action.meta.arg };
        state.orderSuccess = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isOrderRequest = false;
        state.error = new Error(action.error.message ?? 'Ошибка');
        state.orderSuccess = false;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export const selectOrder = (state: { order: OrderState }): TOrder | null =>
  state.order.order;
export const selectOrderRequest = (state: { order: OrderState }): boolean =>
  state.order.isOrderRequest;
export const selectOrderError = (state: { order: OrderState }): Error | null =>
  state.order.error;
export const selectOrderSuccess = (state: { order: OrderState }): boolean =>
  state.order.orderSuccess;

export default orderSlice.reducer;
