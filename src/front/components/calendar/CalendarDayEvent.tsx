import { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationPin } from "@fortawesome/free-solid-svg-icons"
import '@/styles/calendar/CalendarDayEvent.scss'
import { numDigits, getCalendarEventTimeLabel } from '@/utils/utils'

import { EventInfo, CalendarView } from '@/types'

import CalendarEvent from '@/components/calendar/CalendarEvent'

const CalendarDayEvent = ({
    eventInfo,
    view,
    onEditPopover,
    onCopyPopover,
    onDeletePopover,
    isCommerce,
}: { eventInfo: EventInfo,
    view: CalendarView,
    onEditPopover: any,
    onCopyPopover: any,
    onDeletePopover: any,
    isCommerce: boolean,
}) => {

    // dynamic class name of the event-number
    const iconLocationClass = (): string => {
        if (!eventInfo || !eventInfo.index) return 'none'
        if (numDigits(eventInfo.index) === 1) return 'digit1'
        else if (numDigits(eventInfo.index) === 2) return 'digit2'
        else if (numDigits(eventInfo.index) === 3) return 'digit3'
        else return 'none'
    }

    // create dynamic location pic icon jsx element
    const iconLocationPin = useCallback((): JSX.Element => {
        return <div className='icon-wrapper-location-pin'>
            <FontAwesomeIcon icon={faLocationPin} className={`icon-location-pin ${iconLocationClass()}`} color="#39635E" />
            <div className={`event-number ${iconLocationClass()}`}>{eventInfo.index}</div>
        </div>
    }, [eventInfo])

    // create dynamic time label jsx element(hh:mm A - hh:mm A)
    const timeLabel = useCallback((): JSX.Element => {
        if (!eventInfo.is_all_day) return <div className='time-label'>{getCalendarEventTimeLabel({ start: eventInfo.start, end: eventInfo.end })}</div>
    }, [eventInfo])


    const button = useCallback((): JSX.Element => {
        return <div className='calendar-day-event-wrapper'>
            <div className='calendar-day-event calendar-event'>
                <div className='content' style={{color: `${eventInfo?.event_type?.color}`}}>
                    <div className='icon-wrapper'>
                        <FontAwesomeIcon icon={eventInfo?.event_type?.icon} className="icon" color={eventInfo?.event_type?.color} />
                    </div>
                    <div className='title'>
                        {eventInfo.title}
                        {timeLabel()}
                    </div>
                    {iconLocationPin()}
                </div>
            </div>
        </div>

    }, [eventInfo])

    return (
        <>
            <CalendarEvent
                button={button()}
                eventInfo={eventInfo}
                view={view}
                onEditPopover={onEditPopover}
                onCopyPopover={onCopyPopover}
                onDeletePopover={onDeletePopover}
                isCommerce={isCommerce}
            />
        </>
    )
}

export default CalendarDayEvent