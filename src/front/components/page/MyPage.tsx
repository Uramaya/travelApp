"use client"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from "@/stores/store"
import { setCalendarEvents, addCalendarEvents, updateCalendarEvents, deleteCalendarEvents } from "@/stores/calendar";
import { getCalenderEvents, createCalenderEvents, updateCalenderEventsById, deleteCalenderEventsById } from "@/app/api/calendarEvents";

import Calendar from "@/components/common/Calendar"
import GlobalToolBar from "@/components/common/GlobalToolBar"
import Button from '@mui/material/Button'
import uerCalendar from '@/hooks/calendarHook'
import { VIEW_OPTIONS, TEST_EVENTS, INIT_CALENDAR } from '@/const'


const MyPage = () => {
    const {
        date,
        view,
        setDate,
        setView,
        onNavigate,
        onView,
        onTodayClick,
        onNextClick,
        onPrevClick
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
                setView={setView}
                onTodayClick={onTodayClick}
             />
            <Calendar
                date={date}
                view={view}
                events={calendarEvents}
                height='90vh'
                width='60%'
                setDate={setDate}
                setView={setView}
                onNavigate={onNavigate}
                onView={onView}
                onTodayClick={onTodayClick}
                onNextClick={onNextClick}
                onPrevClick={onPrevClick}
            />
        </>
    )
}

export default MyPage