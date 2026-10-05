import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredientsApi } from '@utils/burger-api';

import type { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk('ingredients/fetchAll', async () => {
  return await getIngredientsApi();
});

type IngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  ingredientsError: Error | null;
};

const initialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  ingredientsError: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.ingredientsError = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredientsError = new Error(action.error.message ?? 'Ошибка');
      });
  },
});

export const selectIngredients = (state: {
  ingredients: IngredientsState;
}): TIngredient[] => state.ingredients.ingredients;
export const selectIsLoading = (state: { ingredients: IngredientsState }): boolean =>
  state.ingredients.isIngredientsLoading;
export const selectError = (state: { ingredients: IngredientsState }): Error | null =>
  state.ingredients.ingredientsError;

export default ingredientsSlice.reducer;
