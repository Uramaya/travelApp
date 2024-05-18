'use client'
import { useMemo, useCallback, useEffect, useState, useRef } from 'react'
import { Calendar as BigCalendar, momentLocalizer, EventProps, Views, SlotInfo, Navigate } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import '@/styles/calendar/Calendar.scss'

import { CalendarView, EventInfo, CalendarProps } from '@/types'

import CalendarToolBar from '@/components/calendar/CalendarToolBar'
import CalendarDayEvent from '@/components/calendar/CalendarDayEvent'
import CalendarWeekHeader from '@/components/calendar/CalendarWeekHeader'
import CalendarWeekEvent from '@/components/calendar/CalendarWeekEvent'
import CalendarMonthEvent from '@/components/calendar/CalendarMonthEvent'
import CalendarEventModal from '@/components/calendar/CalendarEventModal'

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
  onPrevClick,
  openCalendarEventModal,
  setOpenCalendarEventModal,
  modalEventInfo,
  setModalEventInfo,
  onOpenModal,
  onClickAddPhoto,
  onUploadPhoto,
  onSave,
  modalEventTimeZoneName,
  setModalEventTimeZoneName,
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
  // customize event component
  const components = useMemo(() => ({
    day: {
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

  const onOpenCalendarEventModal = (eventInfo: SlotInfo | null = null) => {
    // open the calendar event modal
    setOpenCalendarEventModal(true)
    setModalEventInfo(eventInfo)
  }

  // select calendar slot(cell)
  const onSelectSlot = (eventInfo: SlotInfo) => {
    console.log('onSelectSlot eventInfo', eventInfo)
    onOpenCalendarEventModal()

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
        formats={formats}
        selectable
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        showAllEvents
      />
      <CalendarEventModal
        eventInfo={modalEventInfo}
        openCalendarEventModal={openCalendarEventModal}
        setOpenCalendarEventModal={setOpenCalendarEventModal}
        modalEventTimeZoneName={modalEventTimeZoneName}
        setModalEventTimeZoneName={setModalEventTimeZoneName}
        setModalEventInfo={setModalEventInfo}
      />
    </>
  )
}

export default Calendar