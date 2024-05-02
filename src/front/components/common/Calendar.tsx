'use client'
import { useMemo, useCallback, useEffect, useState } from 'react'
import { Calendar as BigCalendar, momentLocalizer, EventProps, Views, SlotInfo, Navigate } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import { VIEW_OPTIONS, TEST_EVENTS, INIT_CALENDAR } from '@/const'
// import uerCalendar from '@/hooks/calendarHook'

import '@/styles/Calendar.scss'

import { CalendarView, EventInfo, CalendarProps } from '@/types'

import CalendarToolBar from '@/components/common/CalendarToolBar'
import CalendarEvent from '@/components/common/CalendarEvent'
import CalendarDayHeader from '@/components/common/CalendarDayHeader'
import CalendarDayEvent from '@/components/common/CalendarDayEvent'
import CalendarWeekHeader from '@/components/common/CalendarWeekHeader'
import CalendarWeekEvent from '@/components/common/CalendarWeekEvent'
import CalendarMonthHeader from '@/components/common/CalendarMonthHeader'
import CalendarMonthDateHeader from '@/components/common/CalendarMonthDateHeader'
import CalendarMonthEvent from '@/components/common/CalendarMonthEvent'

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment)

const Calendar = ({
    date,
    view,
    events,
    height,
    width,
    setDate,
    setView,
    onNavigate,
    onView,
    onTodayClick,
    onNextClick,
    onPrevClick
}: CalendarProps) => {

  // customize event component
  const components = useMemo(() => ({
    day: {
      header: ({ event }: EventProps<EventInfo>) => {
        return <CalendarDayHeader eventInfo={event} />
      },
      event: ({ event }: EventProps<EventInfo>) => {
        return <CalendarDayEvent eventInfo={event} />
      },
    },
    week: {
      header: ({ date }: { date: Date }) => {
        console.log('week date', date)
        return <CalendarWeekHeader date={date} />
      },
      event: ({ event }: EventProps<EventInfo>) => {
        return <CalendarWeekEvent eventInfo={event} />
      },
    },
    month: {
      event: ({ event }: EventProps<EventInfo>) => {
        return <CalendarMonthEvent eventInfo={event} />
      },
    }
  }), [])

  // select calendar slot(cell)
  const onSelectSlot = (eventInfo: SlotInfo) => {
    console.log('onSelectSlot eventInfo', eventInfo)
    // click slot on month view
    // if (view === Views.MONTH) {
    //   setView(Views.WEEK)
    //   setDate(eventInfo.start)
    // }
    // click slot on week view
    // if (view === Views.WEEK) {
    //   setView(Views.DAY)
    //   setDate(eventInfo.start)
    // }
  }

  // select calendar event
  // when select the event, toggle the popup
  const onSelectEvent = useCallback((eventInfo: EventInfo) => {
  }, [])


  return (
    <>
      <CalendarToolBar
        date={date}
        view={view}
        onNextClick={onNextClick}
        onPrevClick={onPrevClick}
        style={{ width: width }}
      />

      <BigCalendar
        localizer={localizer}
        date={date}
        events={events}
        components={components}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
        defaultView={Views.MONTH}
        startAccessor="start"
        endAccessor="end"
        style={{ height: height, width: width }}
        toolbar={false}
        selectable
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        showAllEvents
      />
    </>
  )
}

export default Calendar