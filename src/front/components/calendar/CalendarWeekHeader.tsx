import moment from 'moment'

import '@/styles/calendar/CalendarWeekHeader.scss'

const CalendarWeekHeader = ({ date }: { date: Date }) => {
    // label example: 29 Mon
    const weekday = moment(date).format('ddd')
    const day = moment(date).format('DD')
    console.log('weekday', weekday)
    console.log('day', day)
    return (
        <>
            <div className='calendar-week-weekday'>{weekday}</div>
            <div className='calendar-week-day'>{day}</div>
        </>
    )
}

export default CalendarWeekHeader