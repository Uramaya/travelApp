import { Dispatch } from '@reduxjs/toolkit';
import { SetStateAction } from 'react';
import { Views } from 'react-big-calendar'
type CalendarViewKeys = keyof typeof Views;
export type CalendarView = typeof Views[CalendarViewKeys]

export type EventInfo =  {
    id: number
    title: string
    start: Date
    end: Date
    allDay: boolean | null
    index: number | null
    users: UserInfo[]
    eventType: EventTypeInfo
    location: string
    commute: CommuteInfo | null
    googleMapUrl: string | null
}

export type UserInfo =  {
    id: number
    name: string
    mail: string | null
    language: string | null
    icon: string | null
    timeZone: string | null
}

export type CommuteInfo =  {
    from: string
    to: string
}

export type EventTypeInfo =  {
    type: 'stay' | 'commute' | 'activity' | 'eat' | 'other'
    name: string
}

export type CalendarInfo =  {
    date: Date
    view: CalendarView
    timeZoneName: string
}

export type CalendarProps =  {
    date: Date
    view: CalendarView
    events: EventInfo[]
    height: string
    width: string
    screenWidth: number
    screenHeight: number
    timeZoneName: string
    setDate: React.Dispatch<React.SetStateAction<Date>>
    setView: React.Dispatch<React.SetStateAction<CalendarView>>
    onNavigate: (newDate: Date) => void
    onView: (newView: CalendarView) => void
    onTodayClick: () => void
    onNextClick: () => void
    onPrevClick: () => void
    setTimeZoneName: React.Dispatch<React.SetStateAction<string>>
}

