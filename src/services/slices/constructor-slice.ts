import { createSlice, nanoid } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient, TConstructorIngredient } from '@utils-types';

type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TConstructorIngredient>): void {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare(ingredient: TIngredient) {
        const id = nanoid();
        return { payload: { ...ingredient, id: id } };
      },
    },
    removeIngredient(state, action: PayloadAction<TConstructorIngredient>): void {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
  },
});

export const { addBun, addIngredient, removeIngredient } = constructorSlice.actions;

export const selectConstructor = (
  state: RootState
): {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
} => state.constructorBurger;

export default constructorSlice.reducer;
