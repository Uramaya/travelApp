// This is the example code
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventList } from '@/types'
import { TEST_EVENTS } from '@/const'

const initialState: EventList = null

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // ----------------
    // CRUD: get
    setEvents: (state, action) => {
      return action.payload;
    },
    // CRUD: add
    addEvents: (state: EventList, action: PayloadAction<EventList>) => {
      state = { ...action.payload };
    },
    // CRUD: update
    updateEvents: (state: EventList, action: PayloadAction<{id: number, updatedEvent: EventInfo}>) => {
      // const { id, updatedEvent } = action.payload;
      // const index = state.findIndex((entity) => entity.id === id);
      // if (index !== -1) {
      //   state[index] = updatedEvent;
      // }
    },
    // CRUD: delete
    deleteEvents: (state: EventList, action: PayloadAction<number>) => {
      // const id = action.payload;
      // return state.filter((entity) => entity.id !== id);
    },
  },
});

export const { setEvents, addEvents, updateEvents, deleteEvents } = eventSlice.actions;
export default eventSlice.reducer;