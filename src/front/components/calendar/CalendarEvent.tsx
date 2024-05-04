import { useState, useCallback, ReactNode, useRef, useEffect } from 'react'

import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import '@/styles/calendar/CalendarEvent.scss'
import { EventInfo, CalendarView } from '@/types'

const CalendarEvent = ({button, popover, eventInfo, view}: {button: ReactNode , popover: ReactNode, eventInfo: EventInfo, view: CalendarView}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const buttonDom = useRef(null)
    const [calendarClass, setCalendarClass] = useState<string>('')

    const onClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
      }, [setAnchorEl])

    const onClose = useCallback(() => {
        setAnchorEl(null)
    }, [setAnchorEl])

    // dynamic class name of the event-number
    const getCalendarClass = () => {
        const buttonWidth = buttonDom?.current?.offsetWidth || 0
        // const buttonHeight = buttonDom.current.offsetHeight
        if(!buttonWidth) return ''

        const isDayView = view === 'day'
        const isAllDayEvent = eventInfo.allDay

        // dynamic condition for the all day month/week event
        const isExtraSmallSizeAllDayEvent = !isDayView && isAllDayEvent && (buttonWidth <= 65)
        const isSmallSizeAllDayEvent = !isDayView && isAllDayEvent && (buttonWidth <= 125)
        const isMediumSizeAllDayEvent = !isDayView && isAllDayEvent && (buttonWidth >= 125)

        // dynamic condition for the none-all day month event
        const isExtraSmallSizeMonthEvent = !isDayView && !isAllDayEvent && (buttonWidth <= 65)
        const isSmallSizeMonthEvent = !isDayView && !isAllDayEvent && (buttonWidth <= 125)
        const isMediumSizeMonthEvent = !isDayView && !isAllDayEvent && (buttonWidth >= 125)

        // dynamic condition for the none-all day week event
        const isExtraSmallSizeWeekEvent = !isDayView && !isAllDayEvent && (buttonWidth <= 65)
        const isSmallSizeWeekEvent = !isDayView && !isAllDayEvent && (buttonWidth <= 125)
        const isMediumSizeWeekEvent = !isDayView && !isAllDayEvent && (buttonWidth >= 125)

        // dynamic condition for the all day day event
        const isLargeSizeAllDayDayEvent = isDayView && isAllDayEvent

        // dynamic condition for the none-all day day event
        const isLargeSizeDayEvent = isDayView && !isAllDayEvent


        // all day month/week event
        if(isExtraSmallSizeAllDayEvent) return 'extra-small-size-all-day-event'
        else if(isSmallSizeAllDayEvent) return 'small-size-all-day-event'
        else if(isMediumSizeAllDayEvent) return 'medium-size-all-day-event'
        
        // none-all day month event
        else if(isExtraSmallSizeMonthEvent) return 'extra-small-size-month-event'
        else if(isSmallSizeMonthEvent) return 'small-size-month-event'
        else if(isMediumSizeMonthEvent) return 'medium-size-month-event'
        
        // none-all day week event
        else if(isExtraSmallSizeWeekEvent) return 'extra-small-size-week-event'
        else if(isSmallSizeWeekEvent) return 'small-size-week-event'
        else if(isMediumSizeWeekEvent) return 'medium-size-week-event'

        // all day day event
        else if(isLargeSizeAllDayDayEvent) return 'large-size-all-day-day-event'
        // none-all day day event
        else if(isLargeSizeDayEvent) return 'large-size-day-event'
        else return ''
    }

    useEffect(() => {
        setCalendarClass(getCalendarClass())
    }, [])

    const reGetCalendarClass = () => {
        return `${getCalendarClass()} re-render`
    }
    
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div className={`calendar-event ${calendarClass}`}>
            <Button ref={buttonDom} aria-describedby={id} variant="text" size="small" className={`calendar-event-btn ${reGetCalendarClass()}`} onClick={onClick}>
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