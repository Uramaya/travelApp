"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventInfo } from '@/types'

const initialState: EventInfo[] = []

const calendarEventSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // ----------------
    // CRUD: get
    setCalendarEvents: (state, action: PayloadAction<EventInfo[]>) => {
      return [...action.payload]
    },
    // CRUD: add
    addCalendarEvents: (state: EventInfo[], action: PayloadAction<EventInfo>) => {
      const newState = [...state]
      const event = {
        ...action.payload,
        id: state.length + 1,
      }
      newState.push(event)
      return newState
    },
    // CRUD: update
    updateCalendarEvents: (state: EventInfo[], action: PayloadAction<{id: number, calendarEvent: EventInfo}>) => {
      const { id, calendarEvent } = action.payload
      const newState = [...state]
      const index = newState.findIndex((entity) => entity.id === Number(id))
      if (index !== -1) {
        newState[index] = {...calendarEvent}
      }
      return newState
    },
    // CRUD: delete
    deleteCalendarEvents: (state: EventInfo[], action: PayloadAction<number>) => {
      const id = action.payload;
      return state.filter((entity) => entity.id !==  Number(id))
    },
  },
})

export const { setCalendarEvents, addCalendarEvents, updateCalendarEvents, deleteCalendarEvents } = calendarEventSlice.actions
export default calendarEventSlice.reducer