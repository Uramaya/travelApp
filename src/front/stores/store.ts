import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/stores/auth'
import entitiesReducer from '@/stores/entities'
import calendarEventsReducer from '@/stores/calendar'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        authReducer,
        entitiesReducer,
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