'use client'
import { useMemo, useCallback, useEffect, useState, useRef } from 'react'
import { Calendar as BigCalendar, momentLocalizer, EventProps, Views, SlotInfo, Navigate } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import { VIEW_OPTIONS, TEST_EVENTS, INIT_CALENDAR } from '@/const'
// import uerCalendar from '@/hooks/calendarHook'

import '@/styles/calendar/Calendar.scss'

import { CalendarView, EventInfo, CalendarProps } from '@/types'

import CalendarToolBar from '@/components/calendar/CalendarToolBar'
import CalendarEvent from '@/components/calendar/CalendarEvent'
import CalendarDayHeader from '@/components/calendar/CalendarDayHeader'
import CalendarDayEvent from '@/components/calendar/CalendarDayEvent'
import CalendarWeekHeader from '@/components/calendar/CalendarWeekHeader'
import CalendarWeekEvent from '@/components/calendar/CalendarWeekEvent'
import CalendarMonthHeader from '@/components/calendar/CalendarMonthHeader'
import CalendarMonthDateHeader from '@/components/calendar/CalendarMonthDateHeader'
import CalendarMonthEvent from '@/components/calendar/CalendarMonthEvent'
import CalendarDateCellWrapper from '@/components/calendar/CalendarDateCellWrapper'
import CalendarTimeSlotWrapper from '@/components/calendar/CalendarTimeSlotWrapper'
import CalendarEventAdd from '@/components/calendar/CalendarEventAdd'

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment)

const Calendar = ({
  date,
  view,
  events,
  height,
  width,
  screenWidth,
  screenHeight,
  setDate,
  setView,
  onNavigate,
  onView,
  onTodayClick,
  onNextClick,
  onPrevClick
}: CalendarProps) => {
  const { formats } = useMemo(
    () => ({
      formats: {
        dateFormat: (date, culture, localizer) =>
          localizer.format(date, 'D', culture),
        timeGutterFormat: (date, culture, localizer) =>
          localizer.format(date, 'H:mm', culture),
      },
    }),
    []
  )
  const popoverDom = useRef(null)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [slotEventInfo, setSlotEventInfo] = useState()
  // customize event component
  const components = useMemo(() => ({
    day: {
      header: ({ event }: EventProps<EventInfo>) => {
        return <CalendarDayHeader eventInfo={event} />
      },
      event: ({ event }: EventProps<EventInfo>) => {
        return <CalendarDayEvent eventInfo={event} view="day" />
      },
    },
    week: {
      header: ({ date }: { date: Date }) => {
        return <CalendarWeekHeader date={date} />
      },
      event: ({ event }: EventProps<EventInfo>) => {
        return <CalendarWeekEvent eventInfo={event} view="week" />
      },
    },
    month: {
      event: ({ event }: EventProps<EventInfo>) => {
        return <CalendarMonthEvent eventInfo={event} view="month" />
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
    // const getBoundingClientRect = () => {
    //   return popoverDom.current.getBoundingClientRect()
    // };
    // setSlotEventInfo(eventInfo)
    // setAnchorEl({ getBoundingClientRect, nodeType: 1 })
    // setOpen(true)
  }

  // select calendar event
  // when select the event, toggle the popup
  const onSelectEvent = useCallback((eventInfo: EventInfo) => {
  }, [])

  const onClose = () => {
    setOpen(false)
  }


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
        formats={formats}
        selectable
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        showAllEvents
      />
      <div ref={popoverDom} >
        <CalendarEventAdd open={open} eventInfo={slotEventInfo} anchorEl={anchorEl} onClose={onClose} />
      </div>
    </>
  )
}

export default Calendar