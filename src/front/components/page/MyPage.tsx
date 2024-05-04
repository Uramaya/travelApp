"use client"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from "@/stores/store"
import { setCalendarEvents, addCalendarEvents, updateCalendarEvents, deleteCalendarEvents } from "@/stores/calendar";
import { getCalenderEvents, createCalenderEvents, updateCalenderEventsById, deleteCalenderEventsById } from "@/app/api/calendarEvents";

import Calendar from "@/components/calendar/Calendar"
import GlobalToolBar from "@/components/common/GlobalToolBar"
import GoogleMap from "@/components/googleMap/GoogleMap"
import Button from '@mui/material/Button'
import uerCalendar from '@/hooks/calendarHook'
import { VIEW_OPTIONS, TEST_EVENTS, INIT_CALENDAR } from '@/const'
import Box from '@mui/material/Box'

const MyPage = () => {
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
    } = uerCalendar(INIT_CALENDAR)

    const dispatch = useDispatch<AppDispatch>()
    const calendarEvents = useAppSelector((state) => state.calendarEventsReducer)
    useEffect(() => {
        // Fetch entities on component mount
        getCalenderEvents().then((events) => dispatch(setCalendarEvents(events)))
    }, [dispatch])

    return (
        <>
            <GlobalToolBar
                view={view}
                timeZoneName={timeZoneName}
                setView={setView}
                onTodayClick={onTodayClick}
                setTimeZoneName={setTimeZoneName}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '65%' }}>
                    <Calendar
                        date={date}
                        view={view}
                        events={calendarEvents}
                        height='90vh'
                        width='100%'
                        setDate={setDate}
                        setView={setView}
                        onNavigate={onNavigate}
                        onView={onView}
                        onTodayClick={onTodayClick}
                        onNextClick={onNextClick}
                        onPrevClick={onPrevClick}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '35%' }}>
                    <GoogleMap />
                </Box>
            </Box>

        </>
    )
}

export default MyPage