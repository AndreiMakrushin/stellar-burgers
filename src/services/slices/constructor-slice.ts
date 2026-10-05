import { createSlice, nanoid } from '@reduxjs/toolkit';

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
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: nanoid() } };
      },
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredient(
      state,
      action: PayloadAction<{ id: string; direction: 'up' | 'down' }>
    ) {
      const { id, direction } = action.payload;
      const index = state.ingredients.findIndex((item) => item.id === id);
      if (index === -1) return;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.ingredients.length) return;

      [state.ingredients[index], state.ingredients[targetIndex]] = [
        state.ingredients[targetIndex],
        state.ingredients[index],
      ];
    },
  },
  selectors: {
    selectBun: (state) => state.bun,
    selectIngredients: (state) => state.ingredients,
  },
});

export const { addIngredient, removeIngredient, clearConstructor, moveIngredient } =
  constructorSlice.actions;

export const { selectBun, selectIngredients } = constructorSlice.selectors;

export default constructorSlice.reducer;
