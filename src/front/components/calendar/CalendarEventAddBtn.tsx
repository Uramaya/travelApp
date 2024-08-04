import { useState, useCallback, ReactNode, useRef, useEffect } from 'react'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import '@/styles/calendar/CalendarEventAddBtn.scss'
import { EventInfo, CalendarView, UserInfo, EventListItem } from '@/types'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { INIT_CALENDAR_MODAL_EVENT_INFO } from '@/const'

const CalendarEventAddBtn = ({
    openCalendarEventModal,
    setOpenCalendarEventModal,
    setModalEventInfo,
    onSave,
    allUsers,
    onOpenModal,
    onCloseModal,
    eventItem
}: {
    openCalendarEventModal: boolean,
    setOpenCalendarEventModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalEventInfo: React.Dispatch<React.SetStateAction<EventInfo | null>>,
    onSave: () => void,
    allUsers: UserInfo[],
    onOpenModal: (eventInfo?: EventInfo) => void,
    onCloseModal: () => void,
    eventItem: EventListItem
}) => {
    const onClick = useCallback(() => {
        const eventInitInfo = {
            ...INIT_CALENDAR_MODAL_EVENT_INFO,
            event_id: eventItem.id,
        }
        onOpenModal(eventInitInfo)
    }, [openCalendarEventModal, setOpenCalendarEventModal, eventItem])

    const onClose = useCallback(() => {
        onCloseModal()
    }, [openCalendarEventModal, setOpenCalendarEventModal, eventItem])

    return (
        <div className='calendar-event-add-btn'>
            <Button
                variant="text"
                size="small"
                className='calendar-event-btn'
                onClick={onClick}
            >
                <div className='icon-plus-btn'>
                    <div className='icon-wrapper'>
                        <FontAwesomeIcon icon={faPlus} className="icon" color="#53A9DB" />
                    </div>
                </div>
            </Button>
        </div>
    )
}

export default CalendarEventAddBtn