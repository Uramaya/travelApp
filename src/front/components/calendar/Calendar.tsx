'use client'
import { useMemo, useCallback } from 'react'
import { Calendar as BigCalendar, momentLocalizer, EventProps, Views, SlotInfo } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import '@/styles/calendar/Calendar.scss'

import { EventInfo, CalendarProps } from '@/types'

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
  setDate,
  setView,
  onNavigate,
  onView,
  onNextClick,
  onPrevClick,
  openCalendarEventModal,
  setOpenCalendarEventModal,
  modalEventInfo,
  setModalEventInfo,
  onOpenModal,
  onCloseModal,
  onSave,
  allUsers,
  onClickPopoverBtn,
  onClosePopover,
  eventItem,
  onDeletePopover,
  calendarEventTypeMenuList,
  onDeleteModal,
  isCommerce,
  setIsCommerce,
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
          isCommerce={isCommerce}
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
            isCommerce={isCommerce}
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
          isCommerce={isCommerce}
        />
      },
    }
  }), [events])

  const onEditPopover = useCallback((eventInfo: EventInfo | null = null): void => {
    // open the calendar event modal
    onClosePopover()
    onOpenModal(eventInfo)
  }, [events])

  
const onCopyPopover = useCallback((eventInfo: EventInfo | null = null): void => {
    // open the calendar event modal
    onClosePopover()
    onOpenModal({
      ...eventInfo,
      id: 0,
      title: `${eventInfo.title}(2)`
    })
  }, [events])

  // select calendar slot(cell)
  const onSelectSlot = (slotInfo: SlotInfo) => {
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

  const calendarEventModal = useCallback((): JSX.Element => {
    return <CalendarEventModal
      modalEventInfo={modalEventInfo}
      openCalendarEventModal={openCalendarEventModal}
      setOpenCalendarEventModal={setOpenCalendarEventModal}
      setModalEventInfo={setModalEventInfo}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      onSave={onSave}
      allUsers={allUsers}
      calendarEventTypeMenuList={calendarEventTypeMenuList}
      onDeleteModal={onDeleteModal}
      events={events}
      isCommerce={isCommerce}
      setIsCommerce={setIsCommerce}
    />
  }, [openCalendarEventModal, modalEventInfo])

  const calendarEventAddBtn = useCallback((): JSX.Element => {
    return <CalendarEventAddBtn
      openCalendarEventModal={openCalendarEventModal}
      setOpenCalendarEventModal={setOpenCalendarEventModal}
      setModalEventInfo={setModalEventInfo}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      onSave={onSave}
      allUsers={allUsers}
      eventItem={eventItem}
      events={events}
    />
  }, [openCalendarEventModal, allUsers, events, eventItem])


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
      {calendarEventModal()}
      {calendarEventAddBtn()}
    </>
  )
}

export default Calendar