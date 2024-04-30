// This is the example code
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntitiesState, Entity } from "@/types"

const initialState: EntitiesState = []

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    // CRUD: get
    setEntities: (state, action) => {
      return action.payload;
    },
    // CRUD: add
    addEntity: (state: EntitiesState, action: PayloadAction<Entity>) => {
      state.push(action.payload);
    },
    // CRUD: update
    updateEntity: (state: EntitiesState, action: PayloadAction<{id: number, updatedEntity: Entity}>) => {
      const { id, updatedEntity } = action.payload;
      const index = state.findIndex((entity) => entity.id === id);
      if (index !== -1) {
        state[index] = updatedEntity;
      }
    },
    // CRUD: delete
    deleteEntity: (state: EntitiesState, action: PayloadAction<number>) => {
      const id = action.payload;
      return state.filter((entity) => entity.id !== id);
    },
  },
});

export const { setEntities, addEntity, updateEntity, deleteEntity } = entitiesSlice.actions;
export default entitiesSlice.reducer;