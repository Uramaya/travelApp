import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import { Views } from 'react-big-calendar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import '@/styles/CalendarToolBar.scss'
import moment from 'moment'

import { CalendarView } from '@/types'

import IconButton from '@mui/material/IconButton'


const CalendarToolBar = ({ date, view, onNextClick, onPrevClick, style }: { date: Date, view: CalendarView, onNextClick: any,  onPrevClick: any, style: React.CSSProperties}) => {
    const [weekDay, setWeekDay] = useState<string>('')
    const [label, setLabel] = useState(moment(date).format('MM YYYY'))
    // set label 
    useEffect(() => {
        const weekDay = moment(date).format('ddd')
        setWeekDay(weekDay)
    }, [date, setWeekDay])
    
    // set weekday 
    useEffect(() => {
        const label = moment(date).format('MMM YYYY')
        setLabel(label)
    }, [date, setLabel])

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
        <div className='calendar-tool-bar' style={style}>
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