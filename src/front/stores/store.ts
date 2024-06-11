import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from '@/stores/features/event'
import calendarEventsReducer from '@/stores/features/calendar'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        eventsReducer,
        calendarEventsReducer,
    },
    // temporary add: for prevent the api error
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector