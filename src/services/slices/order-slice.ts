import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { orderBurgerApi } from '@utils/burger-api';

import type { TOrder } from '@utils-types';
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds: string[]) => {
    const data = await orderBurgerApi(ingredientIds);
    return data.order;
  }
);

type OrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: Error | null;
};

const initialState: OrderState = {
  order: null,
  isLoading: false,
  error: null,
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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = new Error(action.error.message ?? 'Ошибка');
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export const selectOrder = (state: { order: OrderState }): TOrder | null =>
  state.order.order;
export const selectOrderLoading = (state: { order: OrderState }): boolean =>
  state.order.isLoading;
export const selectOrderError = (state: { order: OrderState }): Error | null =>
  state.order.error;

export default orderSlice.reducer;
