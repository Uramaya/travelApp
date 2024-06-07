"use client"
import { useEffect, useCallback } from 'react';
import { useDispatch, createSelectorHook } from 'react-redux';
import { useAppSelector, useAppDispatch } from '@/stores/hooks'
import { setCalendarEvents, addCalendarEvents, updateCalendarEvents, deleteCalendarEvents } from "@/stores/features/calendar"
import { getCalenderEvents, createCalenderEvents, updateCalenderEventsById, deleteCalenderEventsById } from "@/app/api/calendarEvents"
import { getEvents, getEventById, createEvents, updateEventsById, deleteEventsById } from "@/app/api/events"
import { setEvents, addEvents, updateEvents, deleteEvents } from "@/stores/features/event"
import { RootState } from '@/stores/store'
import { AppDispatch } from "@/stores/store"
import Calendar from "@/components/calendar/Calendar"
import GlobalToolBar from "@/components/common/GlobalToolBar"
import GoogleMap from "@/components/googleMap/GoogleMap"
import Button from '@mui/material/Button'
import useCalendar from '@/hooks/calendarHook'
import useCalendarEventList from '@/hooks/calendarEventListHook'
import useCalendarEventModal from '@/hooks/calendarEventModalHook'
import useCalendarEventPopoverHook from '@/hooks/calendarEventPopoverHook'
import { INIT_CALENDAR_MODAL_EVENT_INFO, INIT_CALENDAR, All_USERS, EVENTLIST } from '@/const'
import Box from '@mui/material/Box'
import '@/styles/Event.scss'
import GlobalHeader from "@/components/common/GlobalHeader"
import { EventListItem } from '@/types'


const Event = ({ id }:{ id: string }) => {
    const {
        eventItem,
        setEventItem,
    } = useCalendarEventList()
    const {
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
    } = useCalendar(INIT_CALENDAR)

    const {
        openCalendarEventModal,
        setOpenCalendarEventModal,
        modalEventInfo,
        setModalEventInfo,
        onOpenModal,
        onCloseModal,
        onClickAddPhoto,
        onUploadPhoto,
        // onSave,
    } = useCalendarEventModal(INIT_CALENDAR_MODAL_EVENT_INFO)

    const {
        popoverId,
        popoverAnchorEl,
        setPopoverAnchorEl,
        popoverOpen,
        onClickPopoverBtn,
        onClosePopover,
    } = useCalendarEventPopoverHook()

    const dispatch = useDispatch<AppDispatch>()
    const calendarEvents = useAppSelector((state: RootState) => state.calendarEventsReducer)
    const events = useAppSelector((state: RootState) => state.eventsReducer)
    useEffect(() => {
        // Fetch event detail and calendar event on component mount
        getCalenderEvents().then((events) => dispatch(setCalendarEvents(events)))
        getEventById(id).then((eventItem) => setEventItem(eventItem))
    }, [dispatch, getCalenderEvents, getEvents, getEventById, setEvents, setEventItem])

    // when click save button on the calendar edit modal
    const onSaveCalendarModal = useCallback(() => {
        if(!modalEventInfo.id) {
            // create new event
            createCalenderEvents(modalEventInfo).then((calendarEvent) => dispatch(addCalendarEvents(calendarEvent)))
        } else {
            // update event
            updateCalenderEventsById(modalEventInfo.id, modalEventInfo).then(({id, calendarEvent}) => dispatch(updateCalendarEvents({id, calendarEvent})))
        }
            createCalenderEvents(modalEventInfo).then((calendarEvent) => dispatch(addCalendarEvents(calendarEvent)))
    }, [dispatch, modalEventInfo, createCalenderEvents, updateCalenderEventsById])

    // update event item
    const updateEventItem = useCallback((eventItem: EventListItem) => {
        updateEventsById(id, eventItem).then(({id, event}) => setEventItem(event))
    }, [setEventItem, updateEventsById])

    return (
        <>
            <GlobalHeader eventItem={eventItem} updateEventItem={(eventItem) => {updateEventItem(eventItem)}} />
            <GlobalToolBar
                view={view}
                timeZoneName={timeZoneName}
                setView={setView}
                onTodayClick={onTodayClick}
                setTimeZoneName={setTimeZoneName}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '85vh', marginTop: '0px', gap: '10px'}} className='my-event-container'>
                <Box sx={{ overflow: 'auto', resize: 'both', width: '70%' }} className='calendar-area'>
                    <Calendar
                        date={date}
                        view={view}
                        events={calendarEvents}
                        width='100%'
                        height='100vh'
                        setDate={setDate}
                        setView={setView}
                        onNavigate={onNavigate}
                        onView={onView}
                        onTodayClick={onTodayClick}
                        onNextClick={onNextClick}
                        onPrevClick={onPrevClick}
                        openCalendarEventModal={openCalendarEventModal}
                        setOpenCalendarEventModal={setOpenCalendarEventModal}
                        modalEventInfo={modalEventInfo}
                        setModalEventInfo={setModalEventInfo}
                        onOpenModal={onOpenModal}
                        onCloseModal={onCloseModal}
                        onClickAddPhoto={onClickAddPhoto}
                        onUploadPhoto={onUploadPhoto}
                        onSave={onSaveCalendarModal}
                        allUsers={All_USERS}
                        popoverId={popoverId}
                        popoverAnchorEl={popoverAnchorEl}
                        setPopoverAnchorEl={setPopoverAnchorEl}
                        popoverOpen={popoverOpen}
                        onClickPopoverBtn={onClickPopoverBtn}
                        onClosePopover={onClosePopover}
                    />
                </Box>
                <Box sx={{ overflow: 'auto', resize: 'both', height: '85vh', flex: 3 }} className='google-map-area'>
                    <GoogleMap />
                </Box>
            </Box>
        </>
    )
}

export default Event