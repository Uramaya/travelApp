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
import ConfirmModal from "@/components/common/ConfirmModal"
import GoogleMap from "@/components/googleMap/GoogleMap"
import Button from '@mui/material/Button'
import useCalendar from '@/hooks/calendarHook'
import useCalendarEventList from '@/hooks/calendarEventListHook'
import useCalendarEventModal from '@/hooks/calendarEventModalHook'
import useCalendarEventPopoverHook from '@/hooks/calendarEventPopoverHook'
import useCalendarEventTypeListHook from '@/hooks/calendarEventTypeListHook'
import { INIT_CALENDAR_MODAL_EVENT_INFO, INIT_CALENDAR, All_USERS, EVENTLIST } from '@/const'
import Box from '@mui/material/Box'
import '@/styles/Event.scss'
import GlobalHeader from "@/components/common/GlobalHeader"
import { EventListItem, EventInfo, ConfirmModalObj } from '@/types'
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


    const {
        calendarEventTypeMenuList,
    } = useCalendarEventTypeListHook()

    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
    const [confirmModalData, setConfirmModalData] = useState<ConfirmModalObj>({
        modalTitle: '',
        saveBtnTitle: '',
        type: '',
        data: null,
    })

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

    const onConfirmDeleteCalendarEvent = useCallback((id: number) => {
        setConfirmModalData({
            modalTitle: 'Are you sure to delete the calendar event?',
            saveBtnTitle: 'Delete',
            type: 'delete',
            data: {
                id: id,
                type: 'deleteCalendarEvent',
            },
        })
    }, [dispatch, confirmModalData, setConfirmModalData])

    const onDeleteCalendarEvent = useCallback((id: number) => {
        deleteCalenderEventsById(id).then((result) => {
            setEventItem(result.event)
            const calendarEvents = arrangeCalendarEvents(result.calendar_events)
            dispatch(setCalendarEvents(calendarEvents))
        })
    }, [dispatch, deleteCalenderEventsById, setEventItem])

    // update event item
    const updateEventItem = useCallback((eventItem: EventListItem) => {
        updateEventTitleById(id, eventItem.title).then(() => {
            getEventById(id).then((result) => {
                if(result) {
                    setEventItem(result.event)
                    const calendarEvents = arrangeCalendarEvents(result.calendar_events)
                    dispatch(setCalendarEvents(calendarEvents))
                }
            })
        })
    }, [setEventItem, updateEventsById, getEventById, id, arrangeCalendarEvents])

    const onDeleteEvent = useCallback(() => {
        deleteEventsById(eventItem.id).then(() => {
            window.location.href = '/home'
        })
    }, [dispatch, deleteEventsById])

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
                onDeletePopover={onConfirmDeleteCalendarEvent}
                calendarEventTypeMenuList={calendarEventTypeMenuList}
            />
        </Box>
    }

    const googleMap = () => {
        return <div>
            <GoogleMap />
        </div>
    }

    const onCancelConfirmModal = () => {
        setOpenConfirmModal(false)
    }

    const onConfirmDeleteEvent = () => {
        setOpenConfirmModal(true)
        setConfirmModalData({
            modalTitle: 'Are you sure to delete the event?',
            saveBtnTitle: 'Delete',
            type: 'delete',
            data: {
                type: 'deleteEvent',
            },
        })
    }

    const onSaveConfirmModal = (data: {type: string, id?: number}) => {
        switch (data.type) {
            case 'deleteEvent':
                onDeleteEvent()
              break;
            case 'deleteCalendarEvent':
                onDeleteCalendarEvent(data.id)
              break;
        }
        setOpenConfirmModal(false)
    }

    const confirmModal = useCallback((): JSX.Element => {
        return <ConfirmModal
            openConfirmModal={openConfirmModal}
            modalTitle={confirmModalData.modalTitle}
            saveBtnTitle={confirmModalData.saveBtnTitle}
            type={confirmModalData.type}
            data={confirmModalData.data}
            onSave={onSaveConfirmModal}
            onCancel={onCancelConfirmModal}
        />
      }, [openConfirmModal])

    return (
        <>
            <GlobalHeader isHomePage={false} eventItem={eventItem} updateEventItem={(eventItem) => {updateEventItem(eventItem)}} />
            <GlobalToolBar
                view={view}
                timeZoneName={timeZoneName}
                setView={setView}
                onTodayClick={onTodayClick}
                setTimeZoneName={setTimeZoneName}
                onDeleteEvent={onConfirmDeleteEvent}
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
            {confirmModal()}
        </>
    )
}

export default Event