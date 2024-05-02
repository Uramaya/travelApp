'use client'
import { useMemo, useCallback, useEffect, useState } from 'react'
import { Calendar as BigCalendar, momentLocalizer, EventProps, Views, SlotInfo } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import { VIEW_OPTIONS, TEST_EVENTS } from '@/const'

import '@/styles/Calendar.scss'

import { CalendarView, EventInfo } from '@/types'

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

const Calendar = () => {
  // customize event component
  const components = useMemo(() => ({
    // event: ({ event }: EventProps<EventInfo>) => {
    //   return <CalendarEvent eventInfo={event} />
    // },
    day: {
      header: ({ event }: EventProps<EventInfo>) => {
        return <CalendarDayHeader eventInfo={event} />
      },
      event: ({ event }: EventProps<EventInfo>) => {
        return <CalendarDayEvent eventInfo={event} />
      },
    },
    week: {
      header: ({ date }: { date: Date}) => {
        console.log('week date', date)
        return <CalendarWeekHeader date={date} />
      },
      event: ({ event }: EventProps<EventInfo>) => {
        return <CalendarWeekEvent eventInfo={event} />
      },
    },
    month: {
      // header: ({ event }: EventProps<EventInfo>) => {
      //   return <CalendarMonthHeader eventInfo={event} />
      // },
      // dateHeader: ({ event }: EventProps<EventInfo>) => {
      //   return <CalendarMonthDateHeader eventInfo={event} />
      // },
      event: ({ event }: EventProps<EventInfo>) => {
        return <CalendarMonthEvent eventInfo={event} />
      },
    }
  }), [])

  const [date, setDate] = useState(new Date())
  const [view, setView] = useState(Views.MONTH as CalendarView)
  const [events, setEvents] = useState(TEST_EVENTS)

  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate])
  const onView = useCallback((newView: CalendarView) => setView(newView), [setView])

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
    const id = eventInfo.id
    if(typeof id !== 'number') return
    const changeEvents = events.map((event) => {
      if(event.id === id) {
        return {
          ... event,
          isShowPopup: !event.isShowPopup
        }
      }else return event
    })
    setEvents(changeEvents)
  }, [events])

  // click today button
  const onTodayClick = useCallback(() => {
    if (view === Views.DAY) setDate(new Date())
  }, [view])

  // click next button
  const onNextClick = useCallback(() => {
    if (view === Views.DAY) setDate(moment(date).add(1, 'd').toDate())
    if (view === Views.WEEK) setDate(moment(date).add(1, 'w').toDate())
    if (view === Views.MONTH) setDate(moment(date).add(1, 'M').toDate())
  }, [view, date])

  // click prev button
  const onPrevClick = useCallback(() => {
    if (view === Views.DAY) setDate(moment(date).subtract(1, 'd').toDate())
    if (view === Views.WEEK) setDate(moment(date).subtract(1, 'w').toDate())
    if (view === Views.MONTH) setDate(moment(date).subtract(1, 'M').toDate())
  }, [view, date])


  return (
    <>
      <div>Calendar</div>
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
        style={{ height: '90vh' }}
        toolbar={true}
        selectable
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        showAllEvents
      />
    </>
  )
}

export default Calendar