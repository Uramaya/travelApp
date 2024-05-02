import { Views } from 'react-big-calendar'
export const VIEW_OPTIONS = [
    { id: Views.MONTH },
    { id: Views.WEEK },
    { id: Views.DAY },
]

export const INIT_CALENDAR = {
    date: new Date(),
    view: Views.MONTH,
}