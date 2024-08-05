"use client"
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, createSelectorHook } from 'react-redux'
import { useAppSelector, useAppDispatch } from '@/stores/hooks'
import { setCalendarEvents, addCalendarEvents, updateCalendarEvents, deleteCalendarEvents } from "@/stores/features/calendar"
import { getCalenderEvents, createOrUpdateCalenderEvents, deleteCalenderEventsById } from "@/app/api/calendarEvents"
import { getEvents, getEventById, createEvent, updateEventsById, updateEventTitleById, deleteEventsById } from "@/app/api/events"
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
import { EventListItem, EventInfo } from '@/types'
import Splitter from "@/components/splitter/Splitter"

const Event = ({ id }: { id: string }) => {
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
    useEffect(() => {
        // Fetch event detail and calendar event on component mount
        getEventById(id).then((result) => {
            if(result) {
                setEventItem(result.event)
                const calendarEvents = arrangeCalendarEvents(result.calendar_events)
                dispatch(setCalendarEvents(calendarEvents))
            }
        })
    }, [dispatch, getCalenderEvents, getEvents, getEventById, setEvents, setEventItem])

    // add index to the calendar events
    const arrangeCalendarEvents = (calendarEvents: EventInfo[]) => {
        if (!calendarEvents) {
            return []
        }
        return calendarEvents.map((event, index) => {
            return {
                ...event,
                start: new Date(event.start),
                end: new Date(event.end),
                index: index + 1,
                event_id: Number(id) || 0,
            }
        })
    }
    // when click save button on the calendar edit modal
    const onSaveCalendarModal = useCallback(() => {
        // create or update the event
        createOrUpdateCalenderEvents(modalEventInfo).then((result) => {
            setEventItem(result.event)
            const calendarEvents = arrangeCalendarEvents(result.calendar_events)
            dispatch(setCalendarEvents(calendarEvents))
            onCloseModal()
        })
    }, [dispatch, modalEventInfo, createOrUpdateCalenderEvents])

    const onDeletePopover = useCallback((id: number) => {
        deleteCalenderEventsById(id).then((result) => {
            setEventItem(result.event)
            const calendarEvents = arrangeCalendarEvents(result.calendar_events)
            dispatch(setCalendarEvents(calendarEvents))
        })
    }, [dispatch, deleteCalenderEventsById, setEventItem])

    // update event item
    const updateEventItem = useCallback((eventItem: EventListItem) => {
        updateEventTitleById(id, eventItem.title).then(({ result }) => {
            setEventItem({
                ...eventItem,
                title: result
            })
        })
    }, [setEventItem, updateEventsById])

    const calendar = () => {
        return <Box sx={{ width: '100%' }}>
            <Calendar
                date={date}
                view={view}
                events={calendarEvents}
                eventItem={eventItem}
                width='99%'
                height='90vh'
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
                onDeletePopover={onDeletePopover}
            />
        </Box>
    }

    const googleMap = () => {
        return <div>
            <GoogleMap />
        </div>
    }
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
            <Box
                sx={{ height: '84vh', marginTop: '0px', gap: '10px' }}
                className='my-event-container'
            >
                <Splitter
                    leftComponent={calendar()}
                    rightComponent={googleMap()}
                />
            </Box>

            {/* <GlobalHeader eventItem={eventItem} updateEventItem={(eventItem) => {updateEventItem(eventItem)}} />
            <GlobalToolBar
                view={view}
                timeZoneName={timeZoneName}
                setView={setView}
                onTodayClick={onTodayClick}
                setTimeZoneName={setTimeZoneName}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '84vh', marginTop: '0px', gap: '10px'}} className='my-event-container'>
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
                <Box sx={{ overflow: 'auto', resize: 'both', height: '84vh', flex: 3 }} className='google-map-area'>
                    <GoogleMap />
                </Box>
            </Box> */}
        </>
    )
}

export default Event