"use client"
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from "@/stores/store"
import { setEvents, addEvents, updateEvents, deleteEvents } from "@/stores/features/event"
import { getEvents, createEvents, updateEventsById, deleteEventsById } from "@/app/api/events"

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
import GlobalHeader from "@/components/common/GlobalHeader"


const MyHome = () => {
    const dispatch = useDispatch<AppDispatch>()
    const eventList = useAppSelector((state) => state.eventsReducer)
    useEffect(() => {
        // Fetch event list on component mount
        getEvents().then((eventList) => dispatch(setEvents(eventList)))
    }, [dispatch])

    return (
        <>
            <GlobalHeader />
            <Box className='my-home' sx={{ padding: '10px 24px' }}>
                <Box className='home-title' sx={{ marginTop: '10px', marginBottom: '16px' }}>My History</Box>

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
                            return <EventCard eventItem={eventItem} key={eventItem.id} />
                        })}
                    </Box>
                </Box>

                {/* Recent Trip */}
                <Box className='home-title' sx={{ marginTop: '60px' }}>Recent Trip</Box>
                <Box className='event-card-list-wrapper' sx={{ marginTop: '10px', overflowY: 'auto' }}>
                    <Box className='event-card-list' display="flex" justifyContent="start" gap={2}>
                        {eventList.recent.map((eventItem) => {
                            return <EventCard eventItem={eventItem} key={eventItem.id} />
                        })}
                    </Box>
                </Box>

                {/* Explore */}
                <Box className='home-title' sx={{ marginTop: '60px' }}>Explore</Box>
                <Box className='event-card-list-wrapper' sx={{ marginTop: '10px', overflowY: 'auto' }}>
                    <Box className='event-card-list' display="flex" justifyContent="start" gap={2}>
                        {eventList.explore.map((eventItem) => {
                            return <EventCard eventItem={eventItem} isExplore={true} key={eventItem.id} />
                        })}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MyHome