import { useState, useCallback, ReactNode, useRef, useEffect } from 'react'

import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'

import '@/styles/calendar/CalendarEvent.scss'
import { EventInfo, CalendarView } from '@/types'
import CalendarEventPopover from '@/components/calendar/CalendarEventPopover'

const CalendarEvent = ({
    button,
    eventInfo,
    view,
    onEditPopover,
    onCopyPopover,
    onDeletePopover,
}: {button: ReactNode,
    eventInfo: EventInfo,
    view: CalendarView,
    onEditPopover: any,
    onCopyPopover: any,
    onDeletePopover: any,
}) => {
    const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLButtonElement | null>(null)
    const buttonDom = useRef(null)
    const [calendarClass, setCalendarClass] = useState<string>('')

    const onClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setPopoverAnchorEl(event.currentTarget)
    }, [popoverAnchorEl])

    const onClosePopover = useCallback(() => {
        console.log('onClosePopover')
        setPopoverAnchorEl(null)
    }, [popoverAnchorEl])

    // dynamic class name of the event-number
    const getCalendarClass = () => {
        const buttonWidth = buttonDom?.current?.offsetWidth || 0
        const buttonHeight = buttonDom?.current?.offsetHeight || 0
        if(!buttonWidth) return ''

        const isDayView = view === 'day'
        const isMonthView = view === 'month'
        const isWeekView = view === 'week'
        const isAllDayEvent = eventInfo.allDay

        // dynamic condition for the all day month/week event
        const isExtraSmallSizeAllDayEvent = !isDayView && isAllDayEvent && buttonWidth <= 65
        const isSmallSizeAllDayEvent = !isDayView && isAllDayEvent && buttonWidth <= 125
        const isMediumSizeAllDayEvent = !isDayView && isAllDayEvent && buttonWidth >= 125

        // dynamic condition for the none-all day month event
        const isExtraSmallSizeMonthEvent = isMonthView && !isAllDayEvent && buttonWidth <= 65
        const isSmallSizeMonthEvent = isMonthView && !isAllDayEvent && buttonWidth <= 125
        const isMediumSizeMonthEvent = isMonthView && !isAllDayEvent && buttonWidth >= 125

        // dynamic condition for the none-all day week event
        const isExtraSmallSizeWeekEvent = isWeekView && !isAllDayEvent && buttonWidth <= 65
        const isSmallSizeWeekEvent = isWeekView && !isAllDayEvent && buttonWidth <= 125
        const isMediumSizeWeekEvent = isWeekView && !isAllDayEvent && buttonWidth >= 125

        // dynamic condition for the all day day event
        const isLargeSizeAllDayDayEvent = isDayView && isAllDayEvent

        // dynamic condition for the none-all day day event
        const isLargeSizeDayEvent = isDayView && !isAllDayEvent && buttonHeight >= 40
        const isMediumSizeDayEvent = isDayView && !isAllDayEvent && buttonHeight <= 40


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
        else if(isMediumSizeDayEvent) return 'medium-size-day-event'
        else return ''
    }

    useEffect(() => {
        setCalendarClass(getCalendarClass())
    }, [])

    const reGetCalendarClass = () => {
        return `${getCalendarClass()} re-render`
    }
    
    const open = Boolean(popoverAnchorEl);
    const id = open ? `calendar-popover-${eventInfo.id}` : undefined
    return (
        <div className={`calendar-event ${calendarClass}`} style={{ background: `${eventInfo.eventType.backgroundColor}` }}>
            <Button
                ref={buttonDom}
                aria-describedby={id}
                variant="text"
                size="small"
                style={{ background: `${eventInfo.eventType.backgroundColor}` }}
                className={`calendar-event-btn ${reGetCalendarClass()}`}
                onClick={onClick}
            >
                { button }
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={popoverAnchorEl}
                onClose={onClosePopover}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                className="calendar-event-popover"
            >
                <CalendarEventPopover
                    eventInfo={eventInfo}
                    onClosePopover={onClosePopover}
                    onEditPopover={onEditPopover}
                    onCopyPopover={onCopyPopover}
                    onDeletePopover={onDeletePopover}
                 />
            </Popover>
    </div>
    )
}

export default CalendarEvent