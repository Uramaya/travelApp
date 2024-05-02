import { Views } from 'react-big-calendar'
type CalendarViewKeys = keyof typeof Views;
export type CalendarView = typeof Views[CalendarViewKeys]

export type EventInfo =  {
    id: number
    title: string
    start: Date
    end: Date
    allDay?: boolean
    isShowPopup: boolean
    index: number | null
}