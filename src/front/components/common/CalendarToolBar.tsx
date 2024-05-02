import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import { Views } from 'react-big-calendar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import '@/styles/CalendarToolBar.scss'
import moment from 'moment'

import { CalendarView } from '@/types'

import IconButton from '@mui/material/IconButton'


const CalendarToolBar = ({ date, label, view, onNextClick, onPrevClick }: { date: Date, label: string, view: CalendarView, onNextClick: any,  onPrevClick: any}) => {
    const [weekDay, setWeekDay] = useState<string>('')

    // set weekday 
    useEffect(() => {
        const weekDay = moment(date).format('ddd')
        setWeekDay(weekDay)
    }, [date, setWeekDay])

    const calendarLabel = useCallback((): JSX.Element => {
        if (view === Views.DAY) return <div className='label-day'>
            <div className='label-week'>{weekDay}</div>
            <div className='label'>{label}</div>
        </div>
        else return <div className='label'>
            {label}
        </div>
    }, [view, label, weekDay])

    return (
        <div className='calendar-tool-bar'>
            <IconButton className="icon-btn" onClick={onPrevClick} >
                <FontAwesomeIcon icon={faChevronLeft} className="icon" color="#A2A2A2" aria-label="previous" />
            </IconButton>
           { calendarLabel() }
            <IconButton className="icon-btn" onClick={onNextClick}>
                <FontAwesomeIcon icon={faChevronRight} className="icon" color="#A2A2A2" aria-label="next" />
            </IconButton>
        </div>
    )
}

export default CalendarToolBar