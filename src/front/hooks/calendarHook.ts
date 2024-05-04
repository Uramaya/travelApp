import { useMemo, useCallback, useEffect, useState } from 'react'
import { CalendarInfo, CalendarView } from '@/types'
import moment from 'moment'
import { Calendar as BigCalendar, momentLocalizer, EventProps, Views, SlotInfo, Navigate } from 'react-big-calendar'

// the calendar control hook
const useCalendar = (initCalendarInfo: CalendarInfo) => {
  // basic calendar setting
  const [date, setDate] = useState(initCalendarInfo.date)
  const [view, setView] = useState(initCalendarInfo.view)
  const [timeZoneName, setTimeZoneName] = useState(initCalendarInfo.timeZoneName)

  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate])
  const onView = useCallback((newView: CalendarView) => setView(newView), [setView])

  // click today button
  const onTodayClick = () => {
    if (view === Views.DAY) onNavigate(new Date())
  }

  // click next button
  const onNextClick = () => {
    if (view === Views.DAY) onNavigate(moment(date).add(1, 'd').toDate())
    if (view === Views.WEEK) onNavigate(moment(date).add(1, 'w').toDate())
    if (view === Views.MONTH) onNavigate(moment(date).add(1, 'M').toDate())
  }

  // click prev button
  const onPrevClick = () => {
    if (view === Views.DAY) setDate(moment(date).subtract(1, 'd').toDate())
    if (view === Views.WEEK) setDate(moment(date).subtract(1, 'w').toDate())
    if (view === Views.MONTH) setDate(moment(date).subtract(1, 'M').toDate())
  }
  return {
    date,
    view,
    timeZoneName,
    setDate,
    setView,
    onNavigate,
    onView,
    onTodayClick,
    onNextClick,
    onPrevClick,
    setTimeZoneName,
  }
}

export default useCalendar