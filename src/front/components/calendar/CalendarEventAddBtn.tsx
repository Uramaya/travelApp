import { useState, useCallback, ReactNode, useRef, useEffect } from 'react'

import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import CalendarEventAddPopover from '@/components/calendar/CalendarEventPopover'
import '@/styles/calendar/CalendarEvent.scss'
import { EventInfo, CalendarView } from '@/types'

const CalendarEventAddBtn = ({ open, eventInfo, anchorEl, onClose }: { open: boolean, eventInfo: EventInfo | null, anchorEl: HTMLElement | null, onClose: () => void }) => {
    // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    // const onClick = () => {
    //     setOpen(true)
    // }
    const id = open ? 'virtual-element-popover' : undefined

    const popover = useCallback((): JSX.Element => {
        return <CalendarEventAddPopover className='calendar-day-event-add-popover-date-cell' eventInfo={eventInfo} />
    }, [])

    return (
        <div className='calendar-event-add'>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div>{popover()}</div>
            </Popover>
        </div>
    )
}

export default CalendarEventAddBtn