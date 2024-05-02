import { useState, useCallback } from 'react'

import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import '@/styles/CalendarEvent.scss'

const CalendarEvent = ({button, popover}: {button: JSX.Element | Element , popover: JSX.Element | Element}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const onClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
      }, [setAnchorEl])

    const onClose = useCallback(() => {
        setAnchorEl(null)
    }, [setAnchorEl])
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div>
            <Button aria-describedby={id} variant="text" size="small" className="calendar-event-btn" onClick={onClick}>
                { button }
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                className="calendar-event-popover"
            >
                <Typography sx={{ p: 2 }}>{ popover }</Typography>
            </Popover>
    </div>
    )
}

export default CalendarEvent