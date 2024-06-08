"use client"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from "@/stores/store"
import { setCalendarEvents, addCalendarEvents, updateCalendarEvents, deleteCalendarEvents } from "@/stores/calendar"
import { getCalenderEvents, createCalenderEvents, updateCalenderEventsById, deleteCalenderEventsById } from "@/app/api/calendarEvents"
import { getEvents, getEventById, createEvents, updateEventsById, deleteEventsById } from "@/app/api/events"
import { setEvents, addEvents, updateEvents, deleteEvents } from "@/stores/event"

import Calendar from "@/components/calendar/Calendar"
import GlobalToolBar from "@/components/common/GlobalToolBar"
import GoogleMap from "@/components/googleMap/GoogleMap"
import Button from '@mui/material/Button'
import useCalendar from '@/hooks/calendarHook'
import useCalendarEventList from '@/hooks/calendarEventListHook'
import useCalendarEventModal from '@/hooks/calendarEventModalHook'
import useCalendarEventPopoverHook from '@/hooks/calendarEventPopoverHook'
import { INIT_CALENDAR_MODAL_EVENT_INFO, INIT_CALENDAR, All_USERS } from '@/const'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import '@/styles/Event.scss'
import GlobalHeader from "@/components/common/GlobalHeader"
import { EVENTLIST } from '@/const'


const Event = ({ id }:{ id: string | string[] }) => {
    const {
        eventList,
        setEventList,
        eventItem,
        setEventItem,
    } = useCalendarEventList({initEventList: EVENTLIST, eventId: id})

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
        onClickAddPhoto,
        onUploadPhoto,
        onSave,
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
    const calendarEvents = useAppSelector((state) => state.calendarEventsReducer)
    useEffect(() => {
        // Fetch entities on component mount
        getCalenderEvents().then((events) => dispatch(setCalendarEvents(events)))
        getEvents().then((events) => dispatch(setEvents(events)))
    }, [dispatch])

    return (
        <>
            <GlobalHeader eventItem={eventItem} setEventItem={setEventItem} />
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
                        onClickAddPhoto={onClickAddPhoto}
                        onUploadPhoto={onUploadPhoto}
                        onSave={onSave}
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