import { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CalendarEventAdd from '@/components/calendar/CalendarEventAdd'
import CalendarEventAddPopover from '@/components/calendar/CalendarEventPopover'
import { EventInfo, CalendarView } from '@/types'
import Button from '@mui/material/Button'

const CalendarDateCellWrapper = ({ eventInfo }: { eventInfo: EventInfo }) => {
    const button = useCallback((): JSX.Element => {
        return <div className='calendar-date-cell-wrapper'>
        </div>
    }, [])

    const popover = useCallback((): JSX.Element => {
        return <CalendarEventAddPopover className='calendar-day-event-add-popover-date-cell' eventInfo={eventInfo} />
    }, [])

    const onClick =() => {
        console.log("test")
      }

    return (
        <>
            <Button  variant="text" size="small" className='calendar-event-btn' onClick={onClick}>
                test
            </Button>
            {/* <CalendarEventAdd button={button()} popover={popover()} eventInfo={eventInfo} /> */}
        </>
    )
}

export default CalendarDateCellWrapper