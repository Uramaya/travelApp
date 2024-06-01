"use client"
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from "@/stores/store"
import { setCalendarEvents, addCalendarEvents, updateCalendarEvents, deleteCalendarEvents } from "@/stores/calendar";
import { getCalenderEvents, createCalenderEvents, updateCalenderEventsById, deleteCalenderEventsById } from "@/app/api/calendarEvents";

import Calendar from "@/components/calendar/Calendar"
import GlobalToolBar from "@/components/common/GlobalToolBar"
import GoogleMap from "@/components/googleMap/GoogleMap"
import Button from '@mui/material/Button'
import useCalendarEventList from '@/hooks/calendarEventListHook'
import useCalendar from '@/hooks/calendarHook'
import useCalendarEventModal from '@/hooks/calendarEventModalHook'
import useCalendarEventPopoverHook from '@/hooks/calendarEventPopoverHook'
import EventCard from '@/components/mui/EventCard';
import { EVENTLIST } from '@/const'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import '@/styles/MyHome.scss'
import AddTripBtn from '@/components/common/AddTripBtn'


const MyHome = () => {
    const {
        eventList,
        setEventList,
    } = useCalendarEventList(EVENTLIST)

    const dispatch = useDispatch<AppDispatch>()
    const calendarEvents = useAppSelector((state) => state.calendarEventsReducer)
    useEffect(() => {
        // Fetch entities on component mount
        getCalenderEvents().then((events) => dispatch(setCalendarEvents(events)))
    }, [dispatch])

    const onAddTripClick = () => {
        // when click the add trip button
    }

    return (
        <Box className='my-home' sx={{ padding: '10px 24px' }}>
            <Box className='home-title' sx={{ marginTop: '10px' ,marginBottom: '16px' }}>My History</Box>

            {/* Google Map */}
            <Box sx={{ width: '100%', height: '400px' }} className='google-map-area'>
                <GoogleMap />
            </Box>

            <Box sx={{ width: '100%', marginTop: '10px' }} display="flex" justifyContent="flex-end">
                <AddTripBtn />
            </Box>

            {/* Ongoing Trip */}
            <Box className='home-title'>Ongoing Trip</Box>
            <Box className='event-card-list-wrapper' sx={{ marginTop: '10px', overflowY: 'auto' }}>
                <Box className='event-card-list' display="flex" justifyContent="start" gap={2}>
                    {eventList.ongoing.map((eventItem) => {
                        return <EventCard eventItem={eventItem} />
                    })}
                </Box>
            </Box>

            {/* Recent Trip */}
            <Box className='home-title' sx={{ marginTop: '60px'}}>Recent Trip</Box>
            <Box className='event-card-list-wrapper' sx={{ marginTop: '10px', overflowY: 'auto' }}>
                <Box className='event-card-list' display="flex" justifyContent="start" gap={2}>
                    {eventList.recent.map((eventItem) => {
                        return <EventCard eventItem={eventItem} />
                    })}
                </Box>
            </Box>

            {/* Explore */}
            <Box className='home-title' sx={{ marginTop: '60px'}}>Explore</Box>
            <Box className='event-card-list-wrapper' sx={{ marginTop: '10px', overflowY: 'auto' }}>
                <Box className='event-card-list' display="flex" justifyContent="start" gap={2}>
                    {eventList.explore.map((eventItem) => {
                        return <EventCard eventItem={eventItem} isExplore={true} />
                    })}
                </Box>
            </Box>
        </Box>
    )
}

export default MyHome