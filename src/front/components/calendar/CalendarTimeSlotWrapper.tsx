import { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CalendarEventAdd from '@/components/calendar/CalendarEventAdd'
import CalendarEventAddPopover from '@/components/calendar/CalendarEventPopover'
import { EventInfo, CalendarView } from '@/types'

const CalendarTimeSlotWrapper = ({ eventInfo }: { eventInfo: EventInfo }) => {
    const button = useCallback((): JSX.Element => {
        return <div className='calendar-date-cell-wrapper'>
        </div>
    }, [eventInfo])

    const popover = useCallback((): JSX.Element => {
        return <CalendarEventAddPopover className='calendar-day-event-add-popover-date-cell' eventInfo={eventInfo} />
    }, [eventInfo])

    return (
        <>
            <CalendarEventAdd button={button()} popover={popover()} eventInfo={eventInfo} />
        </>
    )
}

export default CalendarTimeSlotWrapper