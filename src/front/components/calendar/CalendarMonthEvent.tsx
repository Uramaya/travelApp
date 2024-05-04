import { useEffect, useCallback, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import '@/styles/calendar/CalendarMonthEvent.scss'
import { numDigits } from '@/utils/utils'

import { EventInfo, CalendarView } from '@/types'

import CalendarEvent from '@/components/calendar/CalendarEvent'
import CalendarEventPopover from '@/components/calendar/CalendarEventPopover'

const CalendarMonthEvent = ({ eventInfo, view }: { eventInfo: EventInfo, view:CalendarView }) => {

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

    const button = useCallback((): JSX.Element => {
        return <div className='calendar-month-event calendar-event'>
            <div className='content'>
                <div className='icon-wrapper'>
                    <FontAwesomeIcon icon={faHotel} className="icon" color="#39635E" />
                </div>
                <div className='title'>{eventInfo.title}</div>
                {iconLocationPin()}
            </div>
        </div>
    }, [eventInfo])

    const popover = useCallback((): JSX.Element => {
        return <CalendarEventPopover className='calendar-month-event-popover' />
    }, [eventInfo])

    return (
        <>
            <CalendarEvent button={button()} popover={popover()} eventInfo={eventInfo} view={view} />
        </>
    )
}

export default CalendarMonthEvent