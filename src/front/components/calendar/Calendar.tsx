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
import CalendarEventAddBtn from '@/components/calendar/CalendarEventAddBtn'


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
  allUsers,
  popoverId,
  popoverAnchorEl,
  setPopoverAnchorEl,
  popoverOpen,
  onClickPopoverBtn,
  onClosePopover,

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
        return <CalendarDayEvent
          eventInfo={event}
          view="day"
          onEditPopover={onEditPopover}
          onCopyPopover={onCopyPopover}
          onDeletePopover={onDeletePopover}
        />
      },
    },
    week: {
      header: ({ date }: { date: Date }) => {
        return <CalendarWeekHeader date={date} />
      },
      event: ({ event }: EventProps<EventInfo>) => {
        return <CalendarWeekEvent
            eventInfo={event}
            view="week"
            onEditPopover={onEditPopover}
            onCopyPopover={onCopyPopover}
            onDeletePopover={onDeletePopover}
          />
      },
    },
    month: {
      event: ({ event }: EventProps<EventInfo>) => {
        return <CalendarMonthEvent
          eventInfo={event}
          view="month"
          onEditPopover={onEditPopover}
          onCopyPopover={onCopyPopover}
          onDeletePopover={onDeletePopover}
        />
      },
    }
  }), [])


  const onDeletePopover = (eventInfo: EventInfo | null = null) => {

  }

  const onEditPopover = (eventInfo: EventInfo | null = null) => {
    // open the calendar event modal
    console.log('onEditPopover', eventInfo)
    setModalEventInfo({
      ...eventInfo,
    })
    onClosePopover()
    setOpenCalendarEventModal(true)
  }

  const onCopyPopover = (eventInfo: EventInfo | null = null) => {
    // open the calendar event modal
    setModalEventInfo({
      ...eventInfo,
    })
    onClosePopover()
    setOpenCalendarEventModal(true)
  }

  // select calendar slot(cell)
  const onSelectSlot = (slotInfo: SlotInfo) => {
    console.log('onSelectSlot slotInfo', slotInfo)
    // open new calendar event modal
    // setModalEventInfo({
    //   ...INIT_CALENDAR_MODAL_EVENT_INFO,
    //   start: slotInfo.start,
    //   end: slotInfo.end,
    // })
    // setOpenCalendarEventModal(true)

    // click slot on month view
    if (view === Views.MONTH) {
      setView(Views.WEEK)
      setDate(slotInfo.start)
    }
    // click slot on week view
    if (view === Views.WEEK) {
      setView(Views.DAY)
      setDate(slotInfo.start)
    }
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
        modalEventInfo={modalEventInfo}
        openCalendarEventModal={openCalendarEventModal}
        setOpenCalendarEventModal={setOpenCalendarEventModal}
        setModalEventInfo={setModalEventInfo}
        onSave={onSave}
        allUsers={allUsers}
      />
      <CalendarEventAddBtn
        openCalendarEventModal={openCalendarEventModal}
        setOpenCalendarEventModal={setOpenCalendarEventModal}
        setModalEventInfo={setModalEventInfo}
        onSave={onSave}
        allUsers={allUsers}
      />
    </>
  )
}

export default Calendar