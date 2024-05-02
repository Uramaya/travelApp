// This is the example code
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventInfo } from '@/types'
import { TEST_EVENTS } from '@/const'

const initialState: EventInfo[] = []

const calendarEventSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // ----------------
    // CRUD: get
    setCalendarEvents: (state, action) => {
      return action.payload;
    },
    // CRUD: add
    addCalendarEvents: (state: EventInfo[], action: PayloadAction<EventInfo>) => {
      state.push(action.payload);
    },
    // CRUD: update
    updateCalendarEvents: (state: EventInfo[], action: PayloadAction<{id: number, updatedEvent: EventInfo}>) => {
      const { id, updatedEvent } = action.payload;
      const index = state.findIndex((entity) => entity.id === id);
      if (index !== -1) {
        state[index] = updatedEvent;
      }
    },
    // CRUD: delete
    deleteCalendarEvents: (state: EventInfo[], action: PayloadAction<number>) => {
      const id = action.payload;
      return state.filter((entity) => entity.id !== id);
    },
  },
});

export const { setCalendarEvents, addCalendarEvents, updateCalendarEvents, deleteCalendarEvents } = calendarEventSlice.actions;
export default calendarEventSlice.reducer;