"use client"
import { useEffect, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from "@/stores/store"
import { setEvents } from "@/stores/features/event"
import { getEvents, getCurrentUserAllEvents, createEvent } from "@/app/api/events"
import { EventInfo } from '@/types'
import GoogleMap from "@/components/googleMap/GoogleMap"
import EventCard from '@/components/mui/EventCard'
import { INIT_EVENT_INFO } from '@/const'
import Box from '@mui/material/Box'
import '@/styles/MyHome.scss'
import AddTripBtn from '@/components/common/AddTripBtn'
import GlobalHeader from "@/components/common/GlobalHeader"


const MyHome = () => {
    const [currentUserEvents, seturrentUserEvents] = useState<EventInfo[]>([])
    const dispatch = useDispatch<AppDispatch>()
    const events = useAppSelector((state) => state.eventsReducer)
    useEffect(() => {
        // Fetch event list on component mount
        getEvents().then((events) => dispatch(setEvents(events)))
    }, [dispatch])

    useEffect(() => {
        // Fetch event list on component mount
        getCurrentUserAllEvents().then((events) => seturrentUserEvents(events))
    }, [dispatch])

    // when click add trip button on the home page
    const onCreateEvent = useCallback(() => {
        // create new event
        createEvent(INIT_EVENT_INFO).then((result) => {
            const eventId = result.event_id
            if (!eventId) {
                return
            }
            window.location.href = `/event/${eventId}`
        })
    }, [dispatch, createEvent])

    return (
        <>
            <GlobalHeader isHomePage={true} onCreateEvent={onCreateEvent}/>
            <Box className='my-home' sx={{ padding: '10px 24px' }}>
                <Box className='home-title' sx={{ marginTop: '10px', marginBottom: '16px' }}>My History</Box>

                {/* Google Map */}
                <Box sx={{ width: '100%', height: '400px' }} className='google-map-area'>
                    <GoogleMap
                        events={currentUserEvents}
                        isNotShowNum={true}
                    />
                </Box>

                <Box sx={{ width: '100%', marginTop: '10px' }} display="flex" justifyContent="flex-end">
                    <AddTripBtn onCreateEvent={onCreateEvent}/>
                </Box>

                {/* Ongoing Trip */}
                <Box className='home-title'>Ongoing Trip</Box>
                <Box className='event-card-list-wrapper' sx={{ marginTop: '10px', overflowY: 'auto' }}>
                    <Box className='event-card-list' display="flex" justifyContent="start" gap={2}>
                        {events.ongoing.map((eventItem, index) => {
                            return <EventCard eventItem={eventItem} key={`ongoing-${index}`} />
                        })}
                    </Box>
                </Box>

                {/* Recent Trip */}
                <Box className='home-title' sx={{ marginTop: '60px' }}>Recent Trip</Box>
                <Box className='event-card-list-wrapper' sx={{ marginTop: '10px', overflowY: 'auto' }}>
                    <Box className='event-card-list' display="flex" justifyContent="start" gap={2}>
                        {events.recent.map((eventItem, index) => {
                            return <EventCard eventItem={eventItem} key={`recent-${index}`} />
                        })}
                    </Box>
                </Box>

                {/* Explore */}
                <Box className='home-title' sx={{ marginTop: '60px' }}>Explore</Box>
                <Box className='event-card-list-wrapper' sx={{ marginTop: '10px', overflowY: 'auto' }}>
                    <Box className='event-card-list' display="flex" justifyContent="start" gap={2}>
                        {events.explore.map((eventItem, index) => {
                            return <EventCard eventItem={eventItem} isExplore={true} key={`explore-${index}`} />
                        })}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MyHome