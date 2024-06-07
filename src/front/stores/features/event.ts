"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventList, EventListItem } from '@/types'
import type { RootState } from '../store'

const initialState: EventList = {
    ongoing: [],
    recent: [],
    explore: [],
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // ----------------
    // CRUD: get
    setEvents: (state: EventList, action: PayloadAction<EventList>) => {
      return { ...action.payload }
    },
    // CRUD: add
    addEvents: (state: EventList, action: PayloadAction<EventListItem>) => {
      const newOngoingList = [...state.ongoing]
      newOngoingList.push(action.payload)
      return {
          ...state,
          ongoing: newOngoingList
      }
    },
    // CRUD: update
    updateEvents: (state: EventList, action: PayloadAction<{id: number, eventItem: EventListItem}>) => {
      const { id, eventItem } = action.payload;
      const id_ = Number(id)
      if(!id_ && id_ !== 0 || !state) return
      const newState = {...state}
      // TODO: to get event detail from api
      const indexOngoing = state.ongoing.findIndex((entity) => entity.id === id_)
      if (indexOngoing !== -1) {
        newState.ongoing[indexOngoing] = {...eventItem}
      }
      const indexRecent = state.recent.findIndex((entity) => entity.id === id_)
      if (indexRecent !== -1) {
        newState.recent[indexRecent] = {...eventItem}
      }
      const indexExplore = state.explore.findIndex((entity) => entity.id === id_)
      if (indexExplore !== -1) {
        newState.explore[indexExplore] = {...eventItem}
      }
      return newState
    },
    // CRUD: delete
    deleteEvents: (state: EventList, action: PayloadAction<number>) => {
      const id = action.payload;
      if(!id && id !== 0) return
      const ongoingList = state.ongoing.filter(item => item.id !== id)
      const recentList = state.recent.filter(item => item.id !== id)
      const exploreList = state.explore.filter(item => item.id !== id)
      
      return {
          ongoing: ongoingList,
          recent: recentList,
          explore: exploreList,
      }
    },
  },
});

export const { setEvents, addEvents, updateEvents, deleteEvents } = eventSlice.actions
export default eventSlice.reducer;